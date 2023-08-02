import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {apiSLice} from "./api/apiSlice";
import pageSlice from "./pageSlice";

const reducer = combineReducers({
    [apiSLice.reducerPath]: apiSLice.reducer,
    page: pageSlice,
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware().concat(apiSLice.middleware)
})
