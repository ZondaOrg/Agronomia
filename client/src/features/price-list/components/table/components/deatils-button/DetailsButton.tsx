import { css } from "@styled-system/css"
import { token } from "@styled-system/tokens"

const styles = css({
    color: token("colors.primaryColor"),
    textDecoration: "underline",
    cursor: "pointer"
})

interface DetailsButtonProps {
    onActive: () => void
}

const DetailsButton = ({onActive}: DetailsButtonProps) => {
    return (
        <button className={styles} onClick={onActive}>Ver detalle</button>
    )
}

export default DetailsButton