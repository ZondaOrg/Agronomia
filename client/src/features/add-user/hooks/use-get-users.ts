import { usePaginatedFetch } from "@/shared/hooks/use-paginator"; // Ajustá la ruta si es necesario
import type { TablePaginator } from "@/shared/components/table/types/Table";
import type { User } from "../types/User";
import getUsersService from "../services/get-users.service";

export const useGetUsers = () => {
    const adapterService = (page: number, size: number) =>
        getUsersService(page, size);

    const { data, error, isLoading, fetchPage, handlePageChange } =
        usePaginatedFetch<TablePaginator<User>, []>(adapterService, 5);

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
