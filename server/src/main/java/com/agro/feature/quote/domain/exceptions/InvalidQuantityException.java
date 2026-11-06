package com.agro.feature.quote.domain.exceptions;

import com.agro.shared.exceptions.BusinessException;

public class InvalidQuantityException extends BusinessException {
    public InvalidQuantityException(Integer quantity) {
        super("La cantidad " + quantity + " debe ser mayor o igual a 1");
    }
}
