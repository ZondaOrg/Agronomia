import { useCallback } from "react";
import type { TablePaginator } from "@/shared/components/table/types/Table";
import useFetch from "@/shared/hooks/use-fetch/useFetch.hook";
import type { User } from "../types/User";
import getUsersService from "../services/get-users.service";

export const UseGetUsers = () => {
    const { data, execute, isLoading, error } =
        useFetch<TablePaginator<User>>();

    const getUsers = useCallback(
        (page: number = 0, size: number = 5) =>
            execute(getUsersService)(page, size),
        [execute],
    );

    return {
        users: data,
        usersLoading: isLoading,
        getUsers,
        error,
    };
};

export default UseGetUsers;
