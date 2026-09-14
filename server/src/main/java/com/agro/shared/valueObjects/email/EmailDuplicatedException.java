package com.agro.shared.valueObjects.email;

import com.agro.shared.exceptions.BusinessException;

public class EmailDuplicatedException extends BusinessException {
    public EmailDuplicatedException(String email) {
        super("El mail " + email + " ya se encuentra registrado");
    }
}
