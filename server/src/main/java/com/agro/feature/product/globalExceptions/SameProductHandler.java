package com.agro.feature.product.globalExceptions;

import com.agro.core.handlers.model.BuisnessErrorResponse;
import com.agro.core.handlers.model.BuisnessHandlerException;
import com.agro.feature.product.domain.exceptions.SameProductNameException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class SameProductHandler extends BuisnessHandlerException<SameProductNameException> {

    @ExceptionHandler
    public ResponseEntity<BuisnessErrorResponse> handle(
            SameProductNameException exception,
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
        return HttpStatus.CONFLICT;
    }

    @Override
    protected String message() {
        return "El proveedor ya tiene un producto con el mismo nombre";
    }

    @Override
    protected String title() {
        return "Productos repetidos";
    }
}

