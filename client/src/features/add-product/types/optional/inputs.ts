import type { InputData } from "@/shared/types/input/input";
import { OPTIONAL } from "../../adapters/request/api-contract";

export const optionalInputs: Record<string, InputData> = {
    [OPTIONAL.name]: {
        type: "text",
        name: OPTIONAL.name,
        title: "NOMBRE DEL OPCIONAL",
        placeholder: "Ingresa nombre del opcional",
        defaultValue: "",
        id: 1,
    },
    [OPTIONAL.price]: {
        type: "number",
        name: OPTIONAL.name,
        title: "PRECIO LISTA",
        placeholder: "$",
        id: 1,
    }
};