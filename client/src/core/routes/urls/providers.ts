export const PROVIDERS = {
    BASE: `proveedores`,
    ADD: `nuevo-proveedor`,
    EDIT: `editar-proveedor/:providerId`,
    EDIT_PATH: (providerId: number) =>
        `editar-proveedor/${providerId}`,
}