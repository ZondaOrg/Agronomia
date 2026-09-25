import { z } from "zod";
import TableBase from "../base/TableBase";
import {
    useForm,
    type FieldValues,
    type DefaultValues,
    type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import type { InferData } from "../../forms/validation-form/shema";
import type { FormTableProps } from "./types/ValidationForm";
import { buildTableDefaultValues } from "./types/defaultValues";
import { buildColumnsFromSchema } from "./types/buildColumnsFromSchema";
import { DraftRow } from "./components/DraftRow";

export const FormTable = <
    T extends Record<string, unknown>,
    S extends z.ZodObject<z.ZodRawShape>,
>({
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
        const cols = buildColumnsFromSchema(schema, inputs);
        const tableDefaults = buildTableDefaultValues(cols);

        return {
            formColumns: cols,
            defaultValues: {
                ...tableDefaults,
                ...initialValues,
            } as DefaultValues<InferData<S> & FieldValues>,
        };
    }, [schema, inputs, initialValues]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<InferData<S> & FieldValues>({
        resolver: zodResolver(schema) as unknown as Resolver<
            InferData<S> & FieldValues
        >,
        defaultValues,
    });

    const values = watch();

    useEffect(() => {
        Object.values(inputs).forEach((input) => {
            if (
                input.disabledWhen &&
                values[input.disabledWhen.field] === input.disabledWhen.value &&
                values[input.name] !== ""
            ) {
                setValue(input.name, "" as never);
            }
        });
    }, [inputs, setValue, values]);

    const handleForm = (data: InferData<S> & FieldValues) => {
        onAddRow(data as InferData<S>);
        reset(defaultValues);
    };

    return (
        <TableBase
            table={{
                columns: formColumns,
                rows: table.rows,
                page: table.page,
            }}
            nameElements={nameElements}
            onPageChange={onPageChange}
            renderRowActions={renderRowActions}
            draftRow={
                <DraftRow
                    columns={formColumns}
                    register={register}
                    errors={errors}
                    values={values}
                    addLabel={addLabel}
                    onSubmit={handleSubmit(handleForm)}
                />
            }
        />
    );
};
