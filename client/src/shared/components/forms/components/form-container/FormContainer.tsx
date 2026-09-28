import type { Size } from "../../types/size";
import { styles } from "./styles";

interface FormContainerProps {
    children: React.ReactNode
    size?: Size
}

const FormContainer = ({children, size}: FormContainerProps) => {
    return (
        <div className={styles(size)}>
            {children}
        </div>
    )
}

export default FormContainer;