import type { ReactNode } from "react";
import { tdActions } from "./style";

export const createActionCell = (content: ReactNode) => (
    <td className={tdActions}>{content}</td>
);
