import type { ColumnHeader } from "@/shared/types/table/Table";
import { th } from "../style";

interface TableHeaderProps {
    columns: ColumnHeader[];
    showActionsColumn: boolean;
}

export const TableHeader = ({
    columns,
    showActionsColumn,
}: TableHeaderProps) => {
    return (
        <thead>
            <tr>
                {columns.map((column) => (
                    <th
                        key={column.key}
                        className={th}
                    >
                        {column.header}
                    </th>
                ))}
                {showActionsColumn && <th className={th}>Acciones</th>}
            </tr>
        </thead>
    );
};

export default TableHeader;
