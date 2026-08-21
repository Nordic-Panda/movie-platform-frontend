// Custom hook for the HomePage movie-related logic.
//
// Since HomePage was abit crowded,
// this hook keeps the page's business/state logic separate from the UI.
// HomePage is mainly responsible for rendering components and passing props,
// while this hook handles things such as:
// - Redux state and selectors
// - fetching movies
// - pagination
// - scrolling after page changes
// - create/update/delete status handling
// - confirmation modal state
// - delete and refresh logic
//
// Breaking this logic out makes HomePage smaller and easier to read.
// It is similar to breaking a large backend handler into smaller methods
// or moving related logic into a separate service/class: each part has
// a clearer responsibility instead of putting everything in one place.
//
// This is called a "custom hook" because it is a reusable function that
// uses React hooks such as useState, useEffect, and useRef.
// A custom hook normally starts with "use", which allows React hook rules
// to apply to it.
//
// The main benefit is separation of concerns:
// the component focuses on WHAT the UI should render,
// while the hook handles HOW the movie page state and behavior works.
//
// Self-note:
// Think of a custom hook as a place to extract React-related logic from
// a component. It does not render UI itself. It gives the component the
// data, state, and functions it needs.

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

    moviesListRef,

    handlePageChange,
    handleDelete,

    closeCreateConfirmation,
    closeUpdateConfirmation,
  };
}
