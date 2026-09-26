import MultiForm from "@/shared/components/forms/multi-form/MultiForm";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";

export const EditProduct = () => {
    const handleSubmit = (
        formData: unknown[],
        deletedIdsBySection?: (number[] | undefined)[],
    ) => {
        const [fieldsData, newPayments] = formData as [
            { nameList: string },
            Payment[],
        ];

        const deletePayments = deletedIdsBySection?.[1] ?? [];

        editProduct({
            vigentId,
            nameList: fieldsData.nameList,
            deletePayments,
            newPayments,
        });
    };

    return (
        <NotifyHandler
            notify={notify}
            action={action}
            isCancel={isCancel}
            isBack={false}
            refresh={onRefresh}
            onCancel={handleCancelNotify}
        >
            <MultiForm
                sections={sections}
                submitLabel="Guardar cambios"
                onSubmit={handleSubmit}
                onCancel={handleCancelNotify}
            />
        </NotifyHandler>
    );
};

export default EditProduct;