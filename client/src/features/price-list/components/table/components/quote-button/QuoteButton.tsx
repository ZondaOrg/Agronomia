import Button from "@/shared/components/button/Button";
import { token } from "@styled-system/tokens";

const QuoteButton = () => {
    return (
        <Button
            color={token("colors.primaryColor")}
            hoverColor={token("colors.primaryColorHover")}
            textColor="white"
            onClick={() => ""}
        >
            Cotizar
        </Button>
    )
}

export default QuoteButton;