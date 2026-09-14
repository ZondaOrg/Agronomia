package com.agro.core.handlers.model;

import com.agro.shared.valueObjects.cuit.CuitDuplicatedException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class DuplicatedCuitHandler extends BuisnessHandlerException<CuitDuplicatedException>{

    @ExceptionHandler(CuitDuplicatedException.class)
    public ResponseEntity<BuisnessErrorResponse> handleCuitDuplicated(
            CuitDuplicatedException exception,
            HttpServletRequest request
    ) {
        return handle(exception, request);
    }

    @Override
    protected HttpStatus status() {
        return HttpStatus.CONFLICT;
    }

    @Override
    protected String message() {
        return "El cuit se encuentra repetido";
    }

    @Override
    protected String title() {
        return "Cuit repetido";
    }
}
