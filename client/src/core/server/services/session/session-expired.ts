type SessionExpiredListener = () => void;

let listener: SessionExpiredListener | undefined;

/*
    PROPÓSITO: Registra la función que se ejecuta cuando expira la sesión.
    Devuelve una función que elimina el registro.
*/
export function onSessionExpired(fn: SessionExpiredListener) {
    listener = fn;
    return () => {
        if (listener === fn) listener = undefined;
    };
}

/*
    PROPÓSITO: Notifica que la sesión expiró.
*/
export function notifySessionExpired() {
    listener?.();
}
