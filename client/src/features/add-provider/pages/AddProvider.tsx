import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import providerSchema from "./types/provider-schema";
import { providerSubForms } from "./types/subforms";
import Button from "@/shared/components/button/Button";
import { token } from "@styled-system/tokens";
import { useAddProviders } from "../hook/use-add-provider";
import Spinner from "@/shared/components/spinner/Spinner";
import ErrorToast from "@/shared/components/toast/error/ErrorToast";
import type { ProviderRequest } from "../adapter/ProviderRequest";
import { ModalCreateProvider } from "./components/ModalCreateProvider";
import { ConfirmModal } from "@/shared/components/modal/variants/ConfirmModalProps";
import { css } from "@styled-system/css";
import useIsModal from "@/shared/hooks/use-is-modal";

const backButtonContainer = css({
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "24px",
});

const AddProvider = () => {
    const { error, loading, addProvider } = useAddProviders();
    const { isOpen, onOpenIs, backToPrev, refresh } = useIsModal();

    const onSubmit = async (data: ProviderRequest) => {
        const created = await addProvider(data);
        if (created) onOpenIs(!!created, "confirm");
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
            <ComposeForm
                subForms={providerSubForms}
                schema={providerSchema}
                buttonData={{ text: "Agregar proveedor" }}
                onSubmit={onSubmit}
                onCancel={(isData) => onOpenIs(isData, "advertence")}
            />
            {loading && <Spinner />}
            {error && (
                <ErrorToast
                    message={error.getMessage}
                    onClose={refresh}
                />
            )}

            <ConfirmModal
                isOpen={isOpen("advertence")}
                title="¿Seguro deseas cancelar?"
                message="Si cancelas perderás los cambios realizados."
                confirmText="Abandonar"
                cancelText="Continuar editando"
                danger
                onConfirm={backToPrev}
                onCancel={refresh}
            />

            <ModalCreateProvider
                isOpen={isOpen("confirm")}
                onClose={backToPrev}
                title="Proveedor agregado"
                message="El proveedor ha sido agregado correctamente."
            />
        </>
    );
};

export default AddProvider;
