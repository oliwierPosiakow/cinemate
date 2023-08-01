import {configureStore} from "@reduxjs/toolkit";
import {apiSLice} from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSLice.reducerPath]: apiSLice.reducer
    },
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware().concat(apiSLice.middleware)
})
