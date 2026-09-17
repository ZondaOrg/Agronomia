import TableBase from "../base/TableBase";
import { useForm, type FieldValues, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import type { InferData, Schema } from "../../forms/validation-form/shema";
import type { FormTableProps } from "./types/ValidationForm";
import { buildTableDefaultValues } from "./types/defaultValues";
import { DraftRow } from "./components/DraftRow";

export const FormTable = <T extends Record<string, unknown>, S extends Schema>({
    table,
    inputs,
    schema,
    nameElements,
    onAddRow,
    addLabel = "Añadir registro",
    onPageChange,
    renderRowActions,
    initialValues,
}: FormTableProps<T, S>) => {
    const { formColumns, defaultValues } = useMemo(() => {
        const cols = table.columns.map((col) => ({
            ...col,
            input: inputs[col.key],
        }));

        const tableDefaults = buildTableDefaultValues(cols);

        return {
            formColumns: cols,
            defaultValues: {
                ...tableDefaults,
                ...initialValues,
            } as DefaultValues<InferData<S> & FieldValues>,
        };
    }, [table.columns, inputs, initialValues]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InferData<S> & FieldValues>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const handleForm = (data: InferData<S> & FieldValues) => {
        onAddRow(data as InferData<S>);
        reset(defaultValues);
    };

    return (
        <TableBase
            table={{ ...table, columns: formColumns }}
            nameElements={nameElements}
            onPageChange={onPageChange}
            renderRowActions={renderRowActions}
            draftRow={
                <DraftRow
                    columns={formColumns}
                    register={register}
                    errors={errors}
                    addLabel={addLabel}
                    onSubmit={handleSubmit(handleForm)}
                />
            }
        />
    );
};
