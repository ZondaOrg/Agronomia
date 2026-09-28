package com.agro.core.handlers.model;

import com.agro.shared.valueObjects.cuit.CuitFormatException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class FormatCuitHandler extends BuisnessHandlerException<CuitFormatException>{

    @ExceptionHandler(CuitFormatException.class)
    public ResponseEntity<BuisnessErrorResponse> handleFormatCuit(
            CuitFormatException exception,
            HttpServletRequest request
    ) {
        return handle(exception, request);
    }

    @Override
    protected HttpStatus status() {
        return HttpStatus.BAD_REQUEST;
    }

    @Override
    protected String message() {
        return "El formato del cuit no es valido";
    }

    @Override
    protected String title() {
        return "Cuit con mal formato";
    }
}
