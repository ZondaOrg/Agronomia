import type React from "react";
import AuthContext from "./auth.context";
import login from "../services/login";
import logout from "../services/logout";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { User } from "@/shared/domain/user/user";
import { isAuthenticate } from "@/core/server/services/jwt/jwt";
import authenticateUser from "../services/authenticate-user";
import { useEffect } from "react";

interface AuthProviderProps {
    children: React.JSX.Element;
}

function AuthProvider({ children }: AuthProviderProps) {
    const { data, error, isLoading, execute, refresh } =
        useFetch<User | undefined>();

    useEffect(() => {
        function fn() {
            if (isAuthenticate()) execute(authenticateUser)();
        }
        fn();
    }, [execute]);

    const value = {
        user: data,
        isLoading,
        error,
        refresh,
        isAuthenticated: isAuthenticate() as boolean,
        login: execute(login),
        logout: execute(logout),
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;
