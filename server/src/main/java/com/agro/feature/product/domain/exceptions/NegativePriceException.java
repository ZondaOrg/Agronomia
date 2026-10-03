package com.agro.feature.product.domain.exceptions;

import com.agro.shared.exceptions.BusinessException;

public class NegativePriceException extends BusinessException {
    public NegativePriceException(String message) {
        super(message);
    }
}
