import type { Optional } from "@/features/price-list/domain/optional";
import OptionalRow from "../optional-row/OptionalRow";
import { css } from "@styled-system/css";

interface OptionsContainerProps {
    optionals: Optional[]
}

const styles = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    w: "96%"
})

const OptionsContainer = ({optionals}: OptionsContainerProps) => {
    return (
        <section>
            <div className={styles}>
                {optionals.map((optional, index) => <OptionalRow optional={optional} key={optional.id} index={index}/>)}
            </div>
        </section>
    )
}

export default OptionsContainer;