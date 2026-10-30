import { useForm } from "react-hook-form";
import type { InferData, Schema } from "./shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { styles } from "./styles";
import { css } from "@styled-system/css";
import { useEffect } from "react";
import SubForm from "./components/subforms/SubForm";
import type { ValidationFormProps } from "./validation-form";

function ValidationForm<T extends Schema>({
    subForms,
    schema,
    onSubmit,
    onDirty,
}: ValidationFormProps<T>) {
    const {
        register,
        handleSubmit,
        formState: { isDirty, errors },
    } = useForm<InferData<T>>({
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        if(isDirty) {
            onDirty();
        }
    }, [isDirty, onDirty])

    const handleForm = (data: InferData<T>) => onSubmit(data);

    const { form, input, row } = styles;

    return (
        <form
            onSubmit={handleSubmit(handleForm)}
            className={css(form)}
            id={"validation-form"}
        >
            {subForms.map((subForm) => (
                <SubForm
                    key={subForm.id}
                    title={subForm.title}
                    inputs={subForm.inputs}
                    register={register}
                    rowStyles={row}
                    inputStyles={input}
                    errors={errors}
                />
            ))}
        </form>
    );
}

export default ValidationForm;
