export interface FormSectionHandle<TData = unknown> {
    isDirty: () => boolean;
    isValid: () => boolean | Promise<boolean>;
    getData: () => TData;
    getDeletedIds?: () => number[];
    reset?: () => void;
}
