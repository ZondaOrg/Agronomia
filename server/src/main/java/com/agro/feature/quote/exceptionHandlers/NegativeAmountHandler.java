package com.agro.feature.quote.exceptionHandlers;

import com.agro.core.handlers.model.BuisnessErrorResponse;
import com.agro.core.handlers.model.BuisnessHandlerException;
import com.agro.feature.quote.domain.exceptions.NegativeAmountException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class NegativeAmountHandler extends BuisnessHandlerException<NegativeAmountException> {

    @ExceptionHandler
    public ResponseEntity<BuisnessErrorResponse> handle(
            NegativeAmountException exception,
            HttpServletRequest request
    ) {
        BuisnessErrorResponse error = new BuisnessErrorResponse(
                title(),
                message(),
                request.getServletPath()
        );
        return ResponseEntity.status(status()).body(error);
    }

    @Override
    protected HttpStatus status() {
        return HttpStatus.BAD_REQUEST;
    }

    @Override
    protected String message() {
        return "Los montos de la cotización no pueden ser negativos";
    }

    @Override
    protected String title() {
        return "Monto negativo";
    }
}
