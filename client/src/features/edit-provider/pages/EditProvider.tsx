import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetProviderById } from "../hook/use-get-provider-by-id";
import { usePutProviderData } from "../hook/use-put-provider";
import ComposeForm from "@/shared/components/forms/compose-form/ComposeForm";
import providerSchema from "./types/provider-edit-schema";
import { generateSubForm } from "./types/input";
import type { ProviderEdit } from "../api/dto/ProviderEdit";
import Spinner from "@/shared/components/spinner/Spinner";
import { ConfirmModal } from "@/shared/components/modal/variants/commit/ConfirmModalProps";
import Button from "@/shared/components/button/Button";
import { token } from "@styled-system/tokens";
import { css } from "@styled-system/css";
import ErrorToast from "@/shared/components/toast/error/ErrorToast";
import { EmptyState } from "@/shared/components/empty-state/EmptyState";
import { SearchIcon } from "@/shared/components/icon/components/icons/Search";
import { ADMIN_ROUTES } from "@/core/routes/admin/paths";

const backButtonContainer = css({
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "24px",
});

export const EditProvider = () => {
    const { error, isLoading, editProvider } = usePutProviderData();
    const { providerId } = useParams<{ providerId: string }>();
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    const navigate = useNavigate();

    const {
        data,
        loading: isLoadingProvider,
        error: errorProvider,
        getProviderById,
    } = useGetProviderById();

    useEffect(() => {
        if (providerId) {
            getProviderById(Number(providerId));
        }
    }, [getProviderById, providerId]);

    const backToProviders = () => {
        navigate(`${ADMIN_ROUTES.BASE}/${ADMIN_ROUTES.PROVIDERS.BASE}`);
    };

    const generatedSubForm = data ? generateSubForm(data) : [];

    const onSubmit = async (formData: Omit<ProviderEdit, "id">) => {
        if (!data) return;

        const updatedProvider = await editProvider({
            id: data.id,
            ...formData,
        });

        if (updatedProvider) {
            navigate(`${ADMIN_ROUTES.BASE}/${ADMIN_ROUTES.PROVIDERS.BASE}`, {
                state: { providerUpdated: true },
            });
        }
    };

    return (
        <>
            {(error || errorProvider) && (
                <ErrorToast
                    message={
                        error?.getMessage ??
                        errorProvider?.getMessage ??
                        "No se pudo editar el proveedor"
                    }
                    onClose={() => {}}
                />
            )}
            <div className={backButtonContainer}>
                <Button
                    color="white"
                    hoverColor={token("colors.primaryColorHover") + "20"}
                    borderColor={token("colors.primaryColor")}
                    textColor={token("colors.primaryColor")}
                    onClick={backToProviders}
                >
                    ← Regresar
                </Button>
            </div>
            {isLoadingProvider ? (
                <Spinner
                    size="lg"
                    centered
                />
            ) : data ? (
                <ComposeForm
                    subForms={generatedSubForm}
                    schema={providerSchema}
                    buttonData={{ text: "Editar proveedor" }}
                    onSubmit={onSubmit}
                    onCancel={() => setIsCancelOpen(true)}
                />
            ) : (
                <EmptyState
                    icon={<SearchIcon />}
                    title="Proveedor no encontrado"
                    description="No se encontró el proveedor solicitado."
                />
            )}
            {isLoading && (
                <Spinner
                    size="lg"
                    centered
                />
            )}
            <ConfirmModal
                isOpen={isCancelOpen}
                title="¿Seguro deseas cancelar?"
                message="Si cancelas perderás los cambios realizados."
                confirmText="Abandonar"
                cancelText="Continuar editando"
                danger
                onConfirm={backToProviders}
                onCancel={() => setIsCancelOpen(false)}
            />
        </>
    );
};
