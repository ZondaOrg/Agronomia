package com.agro.shared.valueObjects.cuit;

import com.agro.shared.exceptions.BusinessException;

public class CuitFormatException extends BusinessException {
    public CuitFormatException(String message) {
        super(message);
    }
}
