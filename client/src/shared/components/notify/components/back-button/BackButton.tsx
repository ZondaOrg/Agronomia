import Button from "@/shared/components/button/Button"
import { token } from "@styled-system/tokens"
import { backButtonContainer } from "./styles"

interface BackButtonProps {
    isCancel: boolean
    onCancel: (isData: boolean) => void
}

const BackButton = ({onCancel, isCancel}: BackButtonProps) => {
    return (
        <div className={backButtonContainer}>
                <Button
                    color="white"
                    hoverColor={token("colors.primaryColorHover") + "20"}
                    borderColor={token("colors.primaryColor")}
                    textColor={token("colors.primaryColor")}
                    onClick={() => onCancel(isCancel)}
                >
                    ← Regresar
                </Button>
            </div>
    )
}

export default BackButton;