import type { Option } from "../select"
import type { TextInputType } from "../type-check"

type BaseCreateField = {
    motive: string
    name: string
    isRequired?: false 
    placeholder?: string
    disable?: boolean
    defaultValue?: string
}

type CreateTextField    = BaseCreateField & {type?: Exclude<TextInputType, "text">}
type CreateSelectField  = BaseCreateField & {type: 'select', options: Option[]}
type CreateDynamicField = BaseCreateField & {type: 'dynamic', format: (data: string) => string}

export type CreateField = CreateTextField | CreateSelectField | CreateDynamicField

export type CreateRowField = CreateField[]