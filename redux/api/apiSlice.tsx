import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
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
        getPopular: builder.query({
            query: () => 'movie/popular?page=1'
        }),
        getMovieTitle: builder.query({
            query: () => '?query=star%20wars'
        }),
        getMovieDetails: builder.query({
            query: () => 'movie/101'
        })
    })
})

export const {
    useGetPopularQuery,
    useGetMovieTitleQuery,
    useGetMovieDetailsQuery
} = apiSLice