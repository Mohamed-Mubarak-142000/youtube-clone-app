import { configureStore } from "@reduxjs/toolkit";
import youtubeReducer from "./features/videoSlice";
const store = configureStore({
  reducer: {
    youtubeApp: youtubeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type DispatchApp = typeof store.dispatch;
