import { useForm } from "react-hook-form";
import type { InferData, Schema } from "./shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { styles } from "./styles";
import { css } from "@styled-system/css";
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
        formState: { errors },
    } = useForm<InferData<T>>({
        resolver: zodResolver(schema)
    });

    const { form, input, row } = styles;

    const handleForm = (data: InferData<T>) => onSubmit(data);

    return (
        <form
            onSubmit={handleSubmit(handleForm)}
            onChange={onDirty}
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
