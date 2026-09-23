export const formatUpdatedAt = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
};
