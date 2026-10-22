export interface FilterConfig {
    id: string;
    required: boolean;
}

export interface StepFiltersState {
    config: FilterConfig[];
    values: Record<string, string>;
    completo: boolean;
}

export interface FilterChainState {
    steps: Record<string, StepFiltersState>;
}
