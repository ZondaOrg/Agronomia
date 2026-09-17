export const CLIENTS = {
    BASE: `clientes`,
    ADD: `nuevo-cliente`,
    EDIT: `editar-cliente/:clientId`,
    EDIT_PATH: (clientId: number) => `editar-cliente/${clientId}`,
}