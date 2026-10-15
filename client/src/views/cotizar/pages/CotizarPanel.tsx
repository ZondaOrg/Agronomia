import FilterChain from "@/shared/components/filter/chain/FilterChain";

export const CotizarPanel = () => {
    return (
        <FilterChain
            stepId="step-1"
            filters={[
                {
                    id: "provincia",
                    label: "Provincia",
                    required: true,
                    variant: "select",
                    options: [
                        { value: "BA", label: "Buenos Aires" },
                        { value: "CABA", label: "CABA" },
                    ],
                },
                {
                    id: "ciudad",
                    label: "Ciudad",
                    required: true,
                    variant: "text",
                },
            ]}
        />
    );
};
