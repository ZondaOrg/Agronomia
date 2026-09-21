package com.agro.feature.product.domain.exceptions;

import com.agro.shared.exceptions.BusinessException;

public class AssignedProductTypeException extends BusinessException {
    public AssignedProductTypeException(String message) {
        super(message);
    }
}
