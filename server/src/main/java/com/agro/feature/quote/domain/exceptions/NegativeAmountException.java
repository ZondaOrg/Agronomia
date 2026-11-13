package com.agro.feature.quote.domain.exceptions;

import com.agro.shared.exceptions.BusinessException;

public class NegativeAmountException extends BusinessException {
    public NegativeAmountException(String field) {
        super("El monto de " + field + " no puede ser negativo");
    }
}
