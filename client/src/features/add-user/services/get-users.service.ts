import http from "@/core/server/http-client";
import type { TablePaginator } from "@/shared/components/table/types/Table";
import { USERS_PATH } from "@/core/server/urls/users";
import type { User } from "../types/User";

async function getUsersService(
    page: number = 0,
    size: number = 10,
): Promise<TablePaginator<User>> {
    const response = await http.get<TablePaginator<User>>(USERS_PATH, {
        params: {
            page,
            size,
        },
    });
    return response.data;
}

export default getUsersService;
