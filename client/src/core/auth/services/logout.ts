import type { User } from "@/shared/domain/user/user";
import type { Credentials } from "../types/credentials";

function logout(user: Credentials): Promise<User | undefined> {
    void user;
    return Promise.resolve(undefined);
}

export default logout;
