package com.agro.feature.productType.domain.exceptions;

import com.agro.shared.exceptions.BusinessException;

public class NameDuplicated extends BusinessException {
    public NameDuplicated(String message) {
        super(message);
    }
}
