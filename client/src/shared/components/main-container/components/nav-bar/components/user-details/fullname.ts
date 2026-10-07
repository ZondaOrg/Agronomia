import type { User } from "@/shared/domain/user/user";

export function getFullName(user: User): string {
    return `${user.name} ${user.surname}`.trim();
}