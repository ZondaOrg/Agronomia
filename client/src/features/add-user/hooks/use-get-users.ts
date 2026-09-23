import { usePaginatedFetch } from "@/shared/hooks/use-paginator/use-paginator";
import type { User } from "../types/User";
import getUsersService from "../services/get-users.service";
import type { Table } from "@/shared/types/table/Table";

export const useGetUsers = () => {
    const adapterService = (page: number, size: number) =>
        getUsersService(page, size);

    const { data, error, isLoading, fetchPage, handlePageChange } =
        usePaginatedFetch<Table<User>, []>(adapterService, 5);

    const getUsers = (page = 0, size = 5) => {
        fetchPage(page, size);
    };

    return {
        users: data,
        error,
        usersLoading: isLoading,
        getUsers,
        onPageChange: handlePageChange,
    };
};

export default useGetUsers;
