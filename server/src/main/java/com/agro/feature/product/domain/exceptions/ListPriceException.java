package com.agro.feature.product.domain.exceptions;

import com.agro.shared.exceptions.BusinessException;

public class ListPriceException extends BusinessException {
    public ListPriceException() {
        super("La lista de precios excede los 8 digitos");
    }
}
