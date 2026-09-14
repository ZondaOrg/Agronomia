package com.agro.shared.valueObjects.cuit;

import com.agro.shared.exceptions.BusinessException;

public class CuitDuplicatedException extends BusinessException {
    public CuitDuplicatedException(String cuit) {
        super("El cuit " + cuit + " ya está registrado");
    }
}
