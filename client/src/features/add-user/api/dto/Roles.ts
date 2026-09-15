import { ROLE, type Role as UserRole } from "@/shared/domain/user/role";

export type Role = Exclude<UserRole, typeof ROLE.OWNER>;
