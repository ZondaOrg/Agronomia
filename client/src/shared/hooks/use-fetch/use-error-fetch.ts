import { VISITANT } from "@/core/routes/visitant/paths";
import type { HttpError } from "@/core/server/errors/http-error";
import { ErrorCause } from "@/core/server/types/error-cause";
import { useCallback } from "react";
import { useNavigate } from "react-router";

/*
    PROPÓSITO: Redirige según el error de la API. Sesión inválida o expirada
    navega al login; errores del servidor navegan a la página de error.
*/
function useErrorFetch() {
    const navigate = useNavigate();

    const handleError = useCallback(
        (error: HttpError) => {
            if (
                error.isCause(ErrorCause.INVALID_SESSION)
            ) {
                navigate(VISITANT.LOGIN, { replace: true });
            } else if (error.isCause(ErrorCause.INTERNAL_SERVER_ERROR)) {
                navigate(VISITANT.SERVER_ERROR);
            }
        },
        [navigate],
    );

    return { handleError };
}

export default useErrorFetch;