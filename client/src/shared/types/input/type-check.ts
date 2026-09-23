export type InputType =
    | "text"
    | "select"
    | "email"
    | "password"
    | "file"
    | "dynamic"
    | "counter-chars";

export type TextInputType = Exclude<InputType, "select" | "dynamic" | "counter-chars">;
export type SelectInputType = Extract<InputType, "select">;