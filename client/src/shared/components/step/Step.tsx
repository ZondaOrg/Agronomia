import type { ComponentType, ReactNode } from "react";

interface Props {
    filter: ReactNode;
    children: ReactNode;
    Container?: ComponentType<{ children: ReactNode }>;
}

const DefaultContainer = ({ children }: { children: ReactNode }) => (
    <>{children}</>
);

export const Step = ({
    filter,
    children,
    Container = DefaultContainer,
}: Props) => (
    <Container>
        {filter}
        {children}
    </Container>
);
