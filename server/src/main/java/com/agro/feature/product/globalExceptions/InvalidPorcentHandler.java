package com.agro.feature.product.globalExceptions;

import com.agro.core.handlers.model.BuisnessErrorResponse;
import com.agro.core.handlers.model.BuisnessHandlerException;
import com.agro.shared.valueObjects.porcent.PorcentException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class InvalidPorcentHandler extends BuisnessHandlerException<PorcentException> {

    @ExceptionHandler
    public ResponseEntity<BuisnessErrorResponse> handle(
            PorcentException exception,
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
        return "La bonificación no se encuentra entre 1 y 100";
    }

    @Override
    protected String title() {
        return "Bonificación invalido";
    }
}
