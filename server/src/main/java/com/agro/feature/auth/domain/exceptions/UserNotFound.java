package com.agro.feature.auth.domain.exceptions;

public class UserNotFound extends RuntimeException {
    public UserNotFound() {
        super("Usuario no encontrado");
    }
}
