import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Redux, do something!
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Redux, let me see what u contain!
export const useAppSelector = useSelector.withTypes<RootState>();
