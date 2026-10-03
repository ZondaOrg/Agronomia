import type { HttpError } from "@/core/server/errors/http-error";
import type { User } from "@/shared/domain/user/user";
import type { Credentials } from "../types/credentials";

export interface UseAuth {
    user?: User;
    isLoading: boolean;
    isAuthenticated: boolean;
    error?: HttpError;
    refresh: () => void;
    login: (credentials: Credentials) => Promise<User | undefined>;
    logout: (credentials: Credentials) => Promise<User | undefined>;
}
