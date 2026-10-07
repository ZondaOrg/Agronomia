export function getRoleDisplayName(role: string): string {
    return role
        .toLowerCase()
        .replace(
            /(^|_)(\w)/g,
            (_, __, letter: string) => ` ${letter.toUpperCase()}`,
        )
        .trim();
}