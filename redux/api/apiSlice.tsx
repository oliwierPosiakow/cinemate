import {Api, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export const apiSLice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3/movie/',
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDY2NWI1NWE0YWVhYTliN2UyNWUxMjM2MWE5ZDNjMiIsInN1YiI6IjY0YzdkZTk2ZWVjNWI1NThlOWUzYmFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LsFjafvK_kYLjYSK2rBiNYeeljrzhSJNg5FsV6qFmXQ'`)
            return headers
        },
    }),
    endpoints: (builder) => ({
        getPopular: builder.query({
            query: () => 'popular'
        }),
        getMovieTitle: builder.query({
            query: () => '?query=star%20wars&api_key=04665b55a4aeaa9b7e25e12361a9d3c2'
        }),
        getMovieDetails: builder.query({
            query: () => ''
        })
    })
})

export const {
    useGetPopularQuery,
    useGetMovieTitleQuery,
    useGetMovieDetailsQuery
} = apiSLice