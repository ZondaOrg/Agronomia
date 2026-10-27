import { configureStore } from "@reduxjs/toolkit";
import { filterChainReducer } from "../../features/cotizar/store/filterChain/filter-chain.slice";
import { authReducer } from "../auth/store/auth.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        filterChain: filterChainReducer,
    },
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
