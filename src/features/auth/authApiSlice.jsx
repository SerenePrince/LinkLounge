import { apiSlice } from "../../app/api/apiSlice.jsx";
import { logOut, setCredentials } from "./authSlice.jsx";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (import.meta.env.MODE === "development") {
            console.log(data); // Log in development only
          }
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          if (import.meta.env.MODE === "development") {
            console.log(err); // Log errors in development only
          }
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (import.meta.env.MODE === "development") {
            console.log(data); // Log in development only
          }
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          if (import.meta.env.MODE === "development") {
            console.log(err); // Log errors in development only
          }
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { ...email },
      }),
    }),
    forgotUsername: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-username",
        method: "POST",
        body: { ...email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { token, password },
      }),
    }),
    sendFeedback: builder.mutation({
      query: ({ username, type, body }) => ({
        url: "/auth/feedback",
        method: "POST",
        body: { username, type, body },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
  useForgotUsernameMutation,
  useResetPasswordMutation,
  useSendFeedbackMutation,
} = authApiSlice;
