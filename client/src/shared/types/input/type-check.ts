export type InputType =
    | "text"
    | "select"
    | "email"
    | "password"
    | "file"
    | "dynamic";

export type TextInputType = Exclude<InputType, "select" | "dynamic">;
export type SelectInputType = Extract<InputType, "select">;