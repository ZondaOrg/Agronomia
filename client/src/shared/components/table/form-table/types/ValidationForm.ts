import type { InferData } from "@/shared/components/forms/validation-form/shema";
import type { InputData } from "@/shared/types/input/input";
import type { Table } from "@/shared/types/table/Table";
import type { Schema } from "zod";

export interface FormTableProps<
    T extends Record<string, unknown>,
    S extends Schema,
> {
    table: Table<T>;
    inputs: Record<string, InputData>;
    schema: S;
    nameElements?: string;
    onAddRow: (data: InferData<S>) => void;
    addLabel?: string;
    onPageChange?: (page: number) => void;
    renderRowActions?: (rowId: number, data: T) => React.ReactNode;
    initialValues?: Partial<InferData<S>>;
}
