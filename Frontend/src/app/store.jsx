import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice.jsx";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice.jsx";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer, // Ensure this is added here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add apiSlice middleware
  devTools: false, // Enable devTools for debugging
});

setupListeners(store.dispatch);
