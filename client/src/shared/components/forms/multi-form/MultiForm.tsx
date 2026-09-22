/* eslint-disable react-hooks/refs */
import { useCallback, useRef } from "react";
import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";
import Button from "../components/button/Button";
import type { FormSectionHandle } from "./types/FormSection";
import type { MultiFormSectionConfig } from "./types/MultiFormSection";
import { container, actions, sectionHeader, title, subtitle } from "./sytles";
import { renderSection } from "./RenderSection";

interface MultiFormProps {
    sections: MultiFormSectionConfig[];
    onSubmit: (
        data: unknown[],
        deletedIdsBySection?: (number[] | undefined)[],
    ) => void;
    onCancel?: (isDirty: boolean) => void;
    submitLabel?: string;
    bordered?: boolean;
}

function MultiForm({
    sections,
    onSubmit,
    onCancel,
    submitLabel = "Guardar",
}: MultiFormProps) {
    const refsMap = useRef<Map<number, FormSectionHandle | null>>(new Map());

    const setRefAt = useCallback(
        (index: number) => (el: FormSectionHandle | null) => {
            if (el) refsMap.current.set(index, el);
            else refsMap.current.delete(index);
        },
        [],
    );

    const handleCancel = () => {
        const anyDirty = Array.from(refsMap.current.values()).some((r) =>
            r?.isDirty(),
        );
        onCancel?.(anyDirty);
    };

    const handleSubmit = async () => {
        const entries = sections.map((_, index) => refsMap.current.get(index));

        const validations = await Promise.all(
            entries.map((r) => r?.isValid() ?? true),
        );
        if (validations.some((v) => !v)) return;

        const data = entries.map((r) => r?.getData());
        const deletedIdsBySection = entries.map((r) => r?.getDeletedIds?.());

        onSubmit(data, deletedIdsBySection);
        entries.forEach((r) => r?.reset?.());
    };

    return (
        <section className={css(container)}>
            {sections.map((section, index) => (
                <div key={index}>
                    {(section.title || section.subtitle) && (
                        <div className={css(sectionHeader)}>
                            {section.title && (
                                <p className={css(title)}>{section.title}</p>
                            )}
                            {section.subtitle && (
                                <p className={css(subtitle)}>
                                    {section.subtitle}
                                </p>
                            )}
                        </div>
                    )}
                    {renderSection(section, setRefAt(index))}
                </div>
            ))}
            <div className={css(actions)}>
                {onCancel && (
                    <Button
                        type="button"
                        color="white"
                        hoverColor={token("colors.primaryColorHover") + "20"}
                        borderColor={token("colors.primaryColor")}
                        textColor={token("colors.primaryColor")}
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>
                )}
                <Button
                    type="button"
                    color={token("colors.primaryColor")}
                    hoverColor={token("colors.primaryColorHover")}
                    onClick={handleSubmit}
                >
                    {submitLabel}
                </Button>
            </div>
        </section>
    );
}

export default MultiForm;
