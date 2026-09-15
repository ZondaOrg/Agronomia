import naturalPersonSchema from "./types/natural-person/natural-person-schema";
import PolimorficForm from "@/shared/components/forms/polimorfic-form/PolimorficForm";
import socialMotiveSchema from "./types/social-motive/social-motive-schema";
import ErrorToast from "@/shared/components/toast/error/ErrorToast";
import useAddClient from "../hooks/use-add-client";
import SuccessToast from "@/shared/components/toast/success/SuccessToast";
import useIsModal from "@/shared/hooks/use-is-modal";
import { ConfirmModal } from "@/shared/components/modal/variants/ConfirmModalProps";
import { ModalCreateClient } from "../components/modal-create-client/ModalCreateClient";
import Button from "@/shared/components/button/Button";
import { token } from "@styled-system/tokens";
import { css } from "@styled-system/css";
import { naturalPersonsubForms } from "./types/natural-person/subforms";
import { socialMotiveSubform } from "./types/social-motive/subforms";
import type { ClientRequest } from "../adapter/request/client";

const backButtonContainer = css({
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "24px",
});

const AddClient = () => {
    const { add, refresh, data, error } = useAddClient();
    const { isOpen, onOpenIs, backToPrev, refresh: r } = useIsModal();

    const handleClient = async (clientData: Exclude<ClientRequest, "type">) => {
        const client = await add(clientData);
        if (client) onOpenIs(!!client, "confirm");
    };

    return (
        <>
            <div className={backButtonContainer}>
                <Button
                    color="white"
                    hoverColor={token("colors.primaryColorHover") + "20"}
                    borderColor={token("colors.primaryColor")}
                    textColor={token("colors.primaryColor")}
                    onClick={backToPrev}
                >
                    ← Regresar
                </Button>
            </div>
            <PolimorficForm
                options={[
                    {
                        subType: "razon social",
                        subforms: socialMotiveSubform,
                        schema: socialMotiveSchema,
                        onSubmit: handleClient,
                    },
                    {
                        subType: "persona natural",
                        subforms: naturalPersonsubForms,
                        schema: naturalPersonSchema,
                        onSubmit: handleClient,
                    },
                ]}
                buttonData={{ text: "Agregar cliente" }}
                onCancel={(isdata) => onOpenIs(isdata, "advertence")}
            />
            <ConfirmModal
                isOpen={isOpen("advertence")}
                title="¿Seguro deseas cancelar?"
                message="Si cancelas perderás los cambios realizados."
                confirmText="Abandonar"
                cancelText="Continuar editando"
                danger
                onConfirm={backToPrev}
                onCancel={r}
            />

            <ModalCreateClient
                isOpen={isOpen("confirm")}
                onClose={backToPrev}
                title="Cliente agregado"
                message="El cliente ha sido agregado correctamente."
            />
            {error && (
                <ErrorToast
                    message={error.message}
                    onClose={refresh}
                />
            )}
            {data && (
                <SuccessToast
                    message={`Se ha creado el cliente ${data.completeName.name} ${data.completeName.surname}`}
                    title="Cliente creado"
                    onClose={refresh}
                />
            )}
        </>
    );
};

export default AddClient;
