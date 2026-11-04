import ErrorToast from "@/shared/components/toast/error/ErrorToast";

interface ErrorMessageProps {
    refresh: () => void;
}

const ErrorMessage = ({refresh}: ErrorMessageProps) => {
    return (
        <ErrorToast
            message={
                "Correo o contraseña incorrectos. Verifique sus datos e intente nuevamente"
            }
            onClose={refresh}
        />
    )
}

export default ErrorMessage