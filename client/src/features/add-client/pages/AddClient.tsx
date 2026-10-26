import naturalPersonSchema from "../types/natural-person/natural-person-schema";
import PolimorficForm from "@/shared/components/forms/polimorfic-form/PolimorficForm";
import socialMotiveSchema from "../types/social-motive/social-motive-schema";
import useAddClient from "../hooks/use-add-client";
import { naturalPersonsubForms } from "../types/natural-person/subforms";
import { socialMotiveSubform } from "../types/social-motive/subforms";
import NotifyHandler from "@/shared/components/notify/NotifyHandler";
import { useLocation, useNavigate } from "react-router";
const AddClient = () => {
    const {
        isCancel,
        notify,
        action,
        add,
        onRefresh,
        handleCancelNotify,
        newClient,
    } = useAddClient();

    const location = useLocation();
    const navigate = useNavigate();

    const handleSuccessClose = () => {
        const returnTo = location.state?.returnTo;

        // 1. Limpiamos el estado para que el modal inicie su cierre
        onRefresh();

        // 2. Retrasamos el salto de ruta 300ms para dejar que el modal
        // limpie su fondo oscuro y su bloqueo de scroll en el body.
        setTimeout(() => {
            if (returnTo && newClient) {
                navigate(returnTo, {
                    replace: true,
                    state: { newClient },
                });
            } else {
                navigate(-1);
            }
        }, 300); // Podés ajustar este tiempo si la animación de tu modal dura más
    };

    return (
        <NotifyHandler
            notify={notify}
            action={action}
            isCancel={isCancel}
            isBack={true}
            refresh={onRefresh}
            onCancel={handleCancelNotify}
            onSuccess={handleSuccessClose}
        >
            <PolimorficForm
                options={[
                    {
                        subType: "razon social",
                        subforms: socialMotiveSubform,
                        schema: socialMotiveSchema,
                        onSubmit: add,
                    },
                    {
                        subType: "persona natural",
                        subforms: naturalPersonsubForms,
                        schema: naturalPersonSchema,
                        onSubmit: add,
                    },
                ]}
                buttonData={{ text: "Agregar cliente" }}
                onCancel={handleCancelNotify}
            />
        </NotifyHandler>
    );
};

export default AddClient;
