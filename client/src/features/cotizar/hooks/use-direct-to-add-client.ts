import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

export const useAddEntityNavigation = (path: string, stepId?: number) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = useCallback(() => {
        navigate(path, {
            state: {
                returnTo: location.pathname,
                stepId,
            },
        });
    }, [navigate, location.pathname, path, stepId]);

    return handleNavigate;
};
