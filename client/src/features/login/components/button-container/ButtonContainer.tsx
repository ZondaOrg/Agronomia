import Button from "@/shared/components/button/Button"
import { token } from "@styled-system/tokens"
import { buttonContainer } from "./styles"

const ButtonContainer = () => {
    return (
        <div className={buttonContainer}>
            <Button
                type="submit"
                fullWidth
                color={token("colors.primaryColor")}
                hoverColor={token("colors.primaryColorHover")}
                form="validation-form"
            >
            Iniciar Sesión
            </Button>   
        </div>
    )
}

export default ButtonContainer