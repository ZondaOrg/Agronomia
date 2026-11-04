import type React from "react";
import AuthContext from "./auth.context";
import login from "../services/login";
import logout from "../services/logout";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { User } from "@/shared/domain/user/user";
import { isAuthenticate } from "@/core/server/services/jwt/jwt";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import authenticateUser from "../services/authenticate-user";
import type { Credentials } from "../types/credentials";
import { selectIsAuthenticated } from "../store/auth.selectors";
import { sessionEnded, sessionStarted } from "../store/auth.slice";
import { useCallback, useEffect } from "react";

interface AuthProviderProps {
    children: React.JSX.Element;
}

function AuthProvider({ children }: AuthProviderProps) {
    const { data, error, isLoading, execute, refresh } =
        useFetch<User | undefined>();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const dispatch = useAppDispatch();

    useEffect(() => {
        function fn() {
            if (isAuthenticate()) execute(authenticateUser)();
        }
        fn();
    }, [execute]);

    useEffect(() => {
        if (!isAuthenticated) refresh();
    }, [isAuthenticated, refresh]);

    const handleLogin = useCallback(
        async (credentials: Credentials) => {
            const user = await execute(login)(credentials);
            dispatch(sessionStarted());
            return user;
        },
        [execute, dispatch],
    );

    const handleLogout = useCallback(
        async (email: string) => {
            const user = await execute(logout)(email);
            dispatch(sessionEnded());
            return user;
        },
        [execute, dispatch],
    );

    const value = {
        user: data,
        isLoading,
        error,
        refresh,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;
