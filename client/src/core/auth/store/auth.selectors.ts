import type { RootState } from "@/core/store";

export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
