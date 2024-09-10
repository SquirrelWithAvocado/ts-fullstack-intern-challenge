import { configureStore } from "@reduxjs/toolkit";
import { createAPI } from "../api/api";
import { data } from "./data";

export const api = createAPI();
export const store = configureStore({
    reducer: data.reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api
            }
        })
});