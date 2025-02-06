import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice.jsx";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://linklounge-api.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const token = state?.auth?.token; // Use optional chaining to prevent undefined errors

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    if (import.meta.env.VITE_NODE_ENV === "development") {
      console.log("sending refresh token");
    }

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Lounge", "User"],
  endpoints: () => ({}),
});
