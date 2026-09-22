package com.agro.feature.product.globalExceptions;

import com.agro.core.handlers.model.BuisnessErrorResponse;
import com.agro.core.handlers.model.BuisnessHandlerException;
import com.agro.feature.product.domain.exceptions.ListPriceException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class InvalidListHandler extends BuisnessHandlerException<ListPriceException> {

    @ExceptionHandler
    public ResponseEntity<BuisnessErrorResponse> handle(
            ListPriceException exception,
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
        return "La lista de precios supera los 8 digitos en su parte entera";
    }

    @Override
    protected String title() {
        return "Lista de precios invalida";
    }
}
