import type { IconProps } from "../../types/IconProps";

export const TrashIcon = ({ className }: IconProps) => {
    return (
        <img
            className={className}
            src="/trash.svg"
            alt=""
            aria-hidden="true"
        />
    );
};
