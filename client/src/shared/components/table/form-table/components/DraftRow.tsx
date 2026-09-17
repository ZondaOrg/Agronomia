import Button from "@/shared/components/button/Button";
import type { InputData } from "@/shared/types/input/input";
import { td, tr } from "../../base/style";
import type {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    Path,
} from "react-hook-form";
import { createActionCell } from "../../base/actionsFactory";
import { token } from "@styled-system/tokens";
import FormTableInput from "./factory";

interface DraftRowProps<TFieldValues extends FieldValues> {
    columns: Array<{ key: string; input?: InputData; [key: string]: unknown }>;
    register: UseFormRegister<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    addLabel: string;
    onSubmit: () => void;
}

export const DraftRow = <TFieldValues extends FieldValues>({
    columns,
    register,
    errors,
    addLabel,
    onSubmit,
}: DraftRowProps<TFieldValues>) => (
    <tr className={tr(0)}>
        {columns.map((column) => (
            <td
                key={column.key}
                className={td}
            >
                {column.input && (
                    <FormTableInput
                        input={column.input}
                        registration={register(
                            column.key as Path<TFieldValues>,
                        )}
                        error={
                            errors[column.key as keyof TFieldValues]
                                ?.message as string
                        }
                    />
                )}
            </td>
        ))}
        {createActionCell(
            <Button
                color="white"
                hoverColor={token("colors.primaryColorHover")}
                textColor={token("colors.primaryColor")}
                textHoverColor="white"
                borderColor={token("colors.primaryColor")}
                type="button"
                onClick={onSubmit}
            >
                {addLabel}
            </Button>,
        )}
    </tr>
);
