import type { Option } from "../select";

export function createSelectOptions(options: readonly string[]): Option[] {
    return options.map(option => {
        return {
            label: option,
            id: option, 
            value: option
        }
    })
}