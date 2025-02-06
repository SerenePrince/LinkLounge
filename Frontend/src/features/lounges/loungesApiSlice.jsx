import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice.jsx";

const loungesAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = loungesAdapter.getInitialState();

export const loungesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLounges: builder.query({
      query: () => "/lounges",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedLounges = responseData.map((lounge) => {
          lounge.id = lounge._id;
          return lounge;
        });
        return loungesAdapter.setAll(initialState, loadedLounges);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Lounge", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Lounge", id })),
          ];
        } else return [{ type: "Lounge", id: "LIST" }];
      },
    }),
    addNewLounge: builder.mutation({
      query: (formData) => ({
        url: "/lounges",
        method: "POST",
        body: formData, // Send the formData directly as the body
      }),
      invalidatesTags: [{ type: "Lounge", id: "LIST" }],
    }),
    updateLounge: builder.mutation({
      query: (formData) => ({
        url: "/lounges",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Lounge", id: arg.id }],
    }),
    deleteLounge: builder.mutation({
      query: ({ id }) => ({
        url: `/lounges`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Lounge", id: arg.id }],
    }),
    // New endpoint to fetch a public lounge by username and title
    getPublicLounge: builder.query({
      query: ({ username, title }) => `/lounges/${username}/${title}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        responseData.id = responseData._id;
        return responseData;
      },
    }),

    // New mutation to toggle the public status of a lounge
    togglePublicLounge: builder.mutation({
      query: ({ loungeId, isPublic }) => ({
        url: "/lounges/public", // Updated to use "public" instead of "make-public"
        method: "PATCH",
        body: {
          loungeId,
          isPublic,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Lounge", id: arg.loungeId },
      ],
    }),

    getLoungesByUser: builder.query({
      query: (user) => `/lounges/${user}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        // Check if responseData is an array (it could be an empty array if no lounges exist)
        const loadedLounges = Array.isArray(responseData)
          ? responseData.map((lounge) => {
              lounge.id = lounge._id;
              return lounge;
            })
          : []; // Default to empty array if no lounges are returned

        return loungesAdapter.setAll(initialState, loadedLounges);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Lounge", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Lounge", id })),
          ];
        } else {
          return [{ type: "Lounge", id: "LIST" }];
        }
      },
    }),
  }),
});

export const {
  useGetLoungesQuery,
  useAddNewLoungeMutation,
  useUpdateLoungeMutation,
  useDeleteLoungeMutation,
  useGetPublicLoungeQuery, // Add the hook for the public lounge query
  useTogglePublicLoungeMutation, // Add the hook for toggling public status
  useGetLoungesByUserQuery, // Add the hook for fetching lounges by user ID
} = loungesApiSlice;

// returns the query result object
export const selectLoungesResult =
  loungesApiSlice.endpoints.getLounges.select();

// creates memoized selector
const selectLoungesData = createSelector(
  selectLoungesResult,
  (loungesResult) => loungesResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllLounges,
  selectById: selectLoungeById,
  selectIds: selectLoungeIds,
} = loungesAdapter.getSelectors(
  (state) => selectLoungesData(state) ?? initialState
);
