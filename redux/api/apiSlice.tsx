import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// @ts-ignore
import {OMD_API, OMD_API_KEY} from '@env'

export const apiSLice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: `${OMD_API}`,
        headers: {
            accept: 'application/json',
            Authorization: `${OMD_API_KEY}`
        }
    }),
    endpoints: (builder) => ({
        getPopular: builder.mutation({
            query: () => {
                return {
                    url: 'movie/popular',
                    method: 'GET'
                }
            }
        }),
        getMovieTitle: builder.query({
            query: () => '?query=star%20wars'
        }),
        getMovieDetails: builder.mutation({
            query: ({movieId}) => {
                return {
                    url: `movie/${movieId}`,
                    method: 'GET',
                }
            }
        })
    })
})

export const {
    useGetPopularMutation,
    useGetMovieTitleQuery,
    useGetMovieDetailsMutation
} = apiSLice