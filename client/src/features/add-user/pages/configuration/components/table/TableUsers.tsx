import { useEffect, forwardRef, useImperativeHandle } from "react";
import Table from "@/shared/components/table/simple-table/Table";
import Spinner from "@/shared/components/spinner/Spinner";
import useGetUsers from "@/features/add-user/hooks/use-get-users";
import type { User } from "@/features/add-user/types/User";

export interface TableUsersRef {
    refresh: () => Promise<void>;
}

export const TableUsers = forwardRef<TableUsersRef>((_, ref) => {
    const { users, getUsers, usersLoading, onPageChange } = useGetUsers();

    useEffect(() => {
        getUsers(0);
    }, []);

    useImperativeHandle(ref, () => ({
        refresh: async () => {
            getUsers(users?.page.page ?? 0);
        },
    }));

    const handleEditUser = (user: User) => {
        // TODO: Lógica de edición
        console.log("Editando usuario:", user);
    };

    const handleDeleteUser = async (id: number) => {
        // TODO: Lógica de eliminación
        console.log("Eliminando usuario:", id);
    };

    if (usersLoading && !users) {
        return <Spinner size="lg" />;
    }

    if (!users) {
        return <div>No hay usuarios disponibles.</div>;
    }

    return (
        <Table<User>
            table={users}
            nameElements="usuarios"
            onPageChange={onPageChange}
            renderRowActions={(rowId, data) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => handleEditUser(data)}>Editar</button>
                    <button onClick={() => handleDeleteUser(rowId)}>
                        Eliminar
                    </button>
                </div>
            )}
        />
    );
});

TableUsers.displayName = "TableUsers";

export default TableUsers;
