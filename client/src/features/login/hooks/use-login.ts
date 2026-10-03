import { ErrorCause } from "@/core/server/types/error-cause";
import { useNavigate } from "react-router";
import {
    DEFAULT_HOME_ROUTE,
    ROLE_HOME_ROUTES,
} from "@/core/routes/role-routes";
import { useAuth } from "@/core/auth/hooks/use-auth";
import type { Credentials } from "@/core/auth/types/credentials";

const useLogin = () => {
    const { refresh, error, login: log, isLoading } = useAuth();
    const navegation = useNavigate();

    const isError = error?.isCause(ErrorCause.INVALID_CREDENTIALS);

    async function login(credentials: Credentials) {
        const user = await log(credentials);
        if (user) {
            const destino = ROLE_HOME_ROUTES[user.role] ?? DEFAULT_HOME_ROUTE;
            navegation(destino);
        }
    }

    return { isError, login, refresh, loading: isLoading };
};

export default useLogin;
