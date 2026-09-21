import type { FormSectionHandle } from "./types/FormSection";
import type { MultiFormSectionConfig } from "./types/MultiFormSection";
import FieldsSection from "./sections/FieldsSection";
import { TableSection } from "./sections/TableSection";

export function renderSection(
    config: MultiFormSectionConfig,
    ref: React.Ref<FormSectionHandle>,
) {
    switch (config.type) {
        case "compose":
            return (
                <FieldsSection
                    ref={ref}
                    subForms={config.subForms}
                    schema={config.schema}
                    initialValues={config.initialValues}
                    hideSubFormTitles={Boolean(config.title)}
                />
            );
        case "table":
            return (
                <TableSection
                    ref={
                        ref as React.Ref<
                            FormSectionHandle<Record<string, unknown>[]>
                        >
                    }
                    inputs={config.inputs}
                    schema={config.schema}
                    nameElements={config.nameElements}
                    addLabel={config.addLabel}
                    initialValues={config.initialValues}
                />
            );
        default: {
            const _exhaustive: never = config;
            return _exhaustive;
        }
    }
}
