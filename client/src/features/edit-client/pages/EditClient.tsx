import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PolimorficForm from "@/shared/components/forms/polimorfic-form/PolimorficForm";
import { useGetClientById } from "../hook/use-get-client-by-id";
import { usePutClient } from "../hook/use-put-client";
import Spinner from "@/shared/components/spinner/Spinner";
import ErrorToast from "@/shared/components/toast/error/ErrorToast";
import naturalPersonSchema from "../types/natural-person/natural-person-schema";
import type { ClientRequest } from "../adapter/request/client";
import { generateForm } from "../types/generate-form";
import socialMotiveSchema from "../types/social-motive/social-motive-schema";
import { ConfirmModal } from "@/shared/components/modal/variants/commit/ConfirmModalProps";

export const EditClient = () => {
    const { clientId } = useParams<{ clientId: string }>();
    const {
        data: client,
        error: getClientError,
        loading,
        getClientById,
        refresh: refreshGetClient,
    } = useGetClientById();
    const {
        editClient,
        error: editClientError,
        isLoading: isEditing,
        refresh: refreshEditClient,
    } = usePutClient();
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (clientId) {
            getClientById(Number(clientId));
        }
    }, [clientId, getClientById]);

    if (loading || !client) {
        return (
            <>
                <Spinner
                    size="lg"
                    centered
                />
                {getClientError && (
                    <ErrorToast
                        message={getClientError.message}
                        onClose={refreshGetClient}
                    />
                )}
            </>
        );
    }

    const isLegalClient = "razonSocial" in client;
    const naturalPersonForms = generateForm(client);
    const socialMotiveForms = generateForm(client);
    const handleSubmit = async (data: Omit<ClientRequest, "type">) => {
        const updatedClient = await editClient(data, client.id);

        if (updatedClient) {
            navigate("..");
        }
    };

    return (
        <>
            {isEditing ? (
                <Spinner
                    size="lg"
                    centered
                />
            ) : (
                <PolimorficForm
                    options={[
                        {
                            subType: "razon social",
                            subforms: socialMotiveForms,
                            schema: socialMotiveSchema,
                            onSubmit: handleSubmit,
                        },
                        {
                            subType: "persona natural",
                            subforms: naturalPersonForms,
                            schema: naturalPersonSchema,
                            onSubmit: handleSubmit,
                        },
                    ]}
                    initialSubType={
                        isLegalClient ? "razon social" : "persona natural"
                    }
                    disableOptions
                    buttonData={{ text: "Guardar cambios" }}
                    onCancel={() => setIsCancelOpen(true)}
                />
            )}
            {editClientError && (
                <ErrorToast
                    message={editClientError.message}
                    onClose={refreshEditClient}
                />
            )}
            <ConfirmModal
                isOpen={isCancelOpen}
                title="¿Seguro deseas cancelar?"
                message="Si cancelas perderás los cambios realizados."
                confirmText="Abandonar"
                cancelText="Continuar editando"
                danger
                onConfirm={() => navigate("..")}
                onCancel={() => setIsCancelOpen(false)}
            />
        </>
    );
};
