package com.agro.feature.product.domain.exceptions;

import com.agro.shared.exceptions.BusinessException;

public class SameProductNameException extends BusinessException {
    public SameProductNameException(String message) {
        super(message);
    }
}
