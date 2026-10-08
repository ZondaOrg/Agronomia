import type { User } from "@/shared/domain/user/user";
import { removeToken } from "@/core/server/services/jwt/jwt";

function logout(email: string): Promise<User | undefined> {
    removeToken();
    return Promise.resolve(undefined);
}

export default logout;
