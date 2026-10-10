import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";

const styles = css({
    display: "flex",
    alignItems: "center",
});

const detailsButtonStyles = css({
    color: token("colors.primaryColor"),
    textDecoration: "underline",
    cursor: "pointer",
});

const ProductByTypeActions = () => {
    return (
        <div className={styles}>
            <button
                className={detailsButtonStyles}
                type="button"
            >
                Ver detalle
            </button>
        </div>
    );
};

export default ProductByTypeActions;
