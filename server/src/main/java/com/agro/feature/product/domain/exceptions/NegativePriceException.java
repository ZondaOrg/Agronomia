package com.agro.feature.product.domain.exceptions;

import com.agro.shared.exceptions.BusinessException;

public class NegativePriceException extends BusinessException {
    public NegativePriceException(Double field) {
        super("El precio del flete " + field + " debe ser mayor a 0");
    }
}
