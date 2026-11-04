package com.agro.feature.auth.services.jwt.exceptions;

import com.agro.shared.dtos.error.CauseError;
import org.springframework.security.core.AuthenticationException;

public class TokenException extends AuthenticationException {
    private final CauseError causeError;

    public TokenException(String message, CauseError causeError) {
        super(message);
        this.causeError = causeError;
    }

    public CauseError getCauseError() {
        return causeError;
    }
}
