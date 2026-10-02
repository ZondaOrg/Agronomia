package com.agro.feature.product.globalExceptions;

import com.agro.core.handlers.model.BuisnessErrorResponse;
import com.agro.core.handlers.model.BuisnessHandlerException;
import com.agro.feature.product.domain.exceptions.NegativePriceException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class NegativePriceHandler extends BuisnessHandlerException<NegativePriceException> {

    @ExceptionHandler
    public ResponseEntity<BuisnessErrorResponse> handle(
            NegativePriceException exception,
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
        return "El valor del flete debe ser mayor a 0";
    }

    @Override
    protected String title() {
        return "Precio de Flete negativo";
    }
}
