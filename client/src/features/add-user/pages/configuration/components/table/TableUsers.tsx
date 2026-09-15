import { useEffect, forwardRef, useImperativeHandle } from "react";
import Table from "@/shared/components/table/simple-table/Table";
import Spinner from "@/shared/components/spinner/Spinner";
import UseGetUsers from "@/features/add-user/hooks/use-get-users";
import type { User } from "@/features/add-user/types/User";

export interface TableUsersRef {
    refresh: () => Promise<void>;
}

export const TableUsers = forwardRef<TableUsersRef>((_, ref) => {
    const { users, getUsers, usersLoading } = UseGetUsers();

    useEffect(() => {
        getUsers(0);
    }, [getUsers]);

    useImperativeHandle(ref, () => ({
        refresh: async () => {
            await getUsers(users?.page ?? 0);
        },
    }));

    const handlePageChange = (page: number) => {
        getUsers(page);
    };

    const handleEditUser = (user: User) => {
        void user;
        // Lógica de edición
    };

    const handleDeleteUser = async (id: number) => {
        void id;
        // Lógica de eliminación
    };

    if (usersLoading && !users) {
        return <Spinner size="lg" />;
    }

    if (!users) {
        return <div>No hay usuarios disponibles.</div>;
    }

    const formattedRows = users.rows.map((row) => ({
        ...row,
        actions: (
            <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => handleEditUser(row.data)}>Editar</button>
                <button onClick={() => handleDeleteUser(row.id)}>
                    Eliminar
                </button>
            </div>
        ),
    }));

    return (
        <Table<User>
            columns={users.columns}
            rows={formattedRows}
            page={users.page}
            size={users.size}
            nameElements="usuarios"
            totalElements={users.totalElements}
            totalPages={users.totalPages}
            last={users.last}
            onPageChange={handlePageChange}
        />
    );
});

TableUsers.displayName = "TableUsers";

export default TableUsers;
