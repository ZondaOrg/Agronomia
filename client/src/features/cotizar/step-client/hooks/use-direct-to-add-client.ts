import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

export const useAddEntityNavigation = (path: string) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = useCallback(() => {
        navigate(path, {
            state: { returnTo: location.pathname },
        });
    }, [navigate, location.pathname, path]);

    return handleNavigate;
};
