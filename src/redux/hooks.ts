import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { DispatchApp, RootState } from "./store";

export const useDispatchApp: () => DispatchApp = useDispatch;
export const useSelectorApp: TypedUseSelectorHook<RootState> = useSelector;
