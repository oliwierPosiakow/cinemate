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
            query: ({page}) => {
                return {
                    url: `movie/popular?page=${page}`,
                    method: 'GET'
                }
            }
        }),
        getMovieTitle: builder.mutation({
            query: ({search,page}) => {
                return {
                    url: `search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`,
                    method: 'GET'
                }
            }
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
    useGetMovieTitleMutation,
    useGetMovieDetailsMutation
} = apiSLice