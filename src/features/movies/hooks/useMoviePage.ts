// Custom hook for the HomePage movie logic.
//
// HomePage was getting a bit crowded, thus moved the movie-related
// state and logic here, such as fetching, pagination, scrolling,
// CRUD status, confirmations and delete logic.
//
// This keeps HomePage focused more on the UI and makes the code
// easier to read and maintain.
//
// A custom hook is just a function that uses React hooks like
// useState, useEffect and useRef. It does not render UI itself.
//
// Self-note:
// Think of it as moving React-related logic out of a component.
// It doesn't have to be reusable; here the main goal is to keep
// HomePage clean.

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteMovie,
  fetchMovies,
  resetCreateStatus,
  resetUpdateStatus,
  resetDeleteStatus,
} from "../movieSlice";

export function useMoviePage() {
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.items);

  const page = useAppSelector((state) => state.movies.page);
  const pageSize = useAppSelector((state) => state.movies.pageSize);
  const totalPages = useAppSelector((state) => state.movies.totalPages);

  const fetchStatus = useAppSelector((state) => state.movies.fetchStatus);
  const fetchError = useAppSelector((state) => state.movies.fetchError);

  const createStatus = useAppSelector((state) => state.movies.createStatus);
  const createError = useAppSelector((state) => state.movies.createError);

  const updateStatus = useAppSelector((state) => state.movies.updateStatus);
  const updateError = useAppSelector((state) => state.movies.updateError);

  const deleteStatus = useAppSelector((state) => state.movies.deleteStatus);
  const deleteError = useAppSelector((state) => state.movies.deleteError);

  const [showCreateConfirmation, setShowCreateConfirmation] = useState(false);

  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);

  const moviesListRef = useRef<HTMLDivElement>(null);
  const previousPageRef = useRef<number | null>(null);

  // Init
  useEffect(() => {
    dispatch(
      fetchMovies({
        page: 1,
        pageSize,
      }),
    );
  }, [dispatch, pageSize]);

  // Scroll to movie after page change
  useEffect(() => {
    if (fetchStatus !== "succeeded") {
      return;
    }

    if (previousPageRef.current === null) {
      previousPageRef.current = page;
      return;
    }

    if (previousPageRef.current === page) {
      return;
    }

    previousPageRef.current = page;

    const element = moviesListRef.current;

    if (!element) {
      return;
    }

    const top = element.getBoundingClientRect().top + window.scrollY - 32;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, [page, fetchStatus]);

  // When create is succeeded
  useEffect(() => {
    if (createStatus !== "succeeded") {
      return;
    }

    dispatch(
      fetchMovies({
        page,
        pageSize,
      }),
    )
      .unwrap()
      .then(() => {
        setShowCreateConfirmation(true);
        dispatch(resetCreateStatus());
      });
  }, [createStatus, dispatch, page, pageSize]);

  // when update is succeeded
  useEffect(() => {
    if (updateStatus !== "succeeded") {
      return;
    }

    setShowUpdateConfirmation(true);
  }, [updateStatus]);

  function handlePageChange(newPage: number) {
    dispatch(
      fetchMovies({
        page: newPage,
        pageSize,
      }),
    );
  }

  async function handleDelete(id: string) {
    await dispatch(deleteMovie(id)).unwrap();

    const targetPage = movies.length === 1 && page > 1 ? page - 1 : page;

    // unwrap() lets us continue only if fetchMovies succeeds.
    // If it fails, it throws and execution stops here, or end up in catch if we try catch
    // since no try catch, the error can be handled by the caller.
    await dispatch(
      fetchMovies({
        page: targetPage,
        pageSize,
      }),
    ).unwrap();

    // Reset the status so deleteStatus does not stay "succeeded".
    dispatch(resetDeleteStatus());
  }

  function closeCreateConfirmation() {
    setShowCreateConfirmation(false);
  }

  function closeUpdateConfirmation() {
    setShowUpdateConfirmation(false);
    dispatch(resetUpdateStatus());
  }

  return {
    movies,
    page,
    pageSize,
    totalPages,

    moviesListRef,

    fetchStatus,
    fetchError,

    createStatus,
    createError,

    updateStatus,
    updateError,

    deleteStatus,
    deleteError,

    showCreateConfirmation,
    showUpdateConfirmation,

    handlePageChange,
    handleDelete,

    closeCreateConfirmation,
    closeUpdateConfirmation,
  };
}
