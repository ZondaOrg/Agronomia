import http from "@/core/server/http-client";
import { USERS_PATH } from "@/core/server/urls/users";
import type { User } from "../types/User";
import type { Table } from "@/shared/types/table/Table";

async function getUsersService(
    page: number = 0,
    size: number = 10,
): Promise<Table<User>> {
    const response = await http.get<Table<User>>(USERS_PATH, {
        params: {
            page,
            size,
        },
    });
    return response.data;
}

export default getUsersService;
