package com.agro.core.handlers.model;

import com.agro.shared.exceptions.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public abstract class BuisnessHandlerException<E extends BusinessException> {

    public ResponseEntity<BuisnessErrorResponse> handle(
            E exception,
            HttpServletRequest request
    ) {
        log.warn("Business rule violation - URI: {} | Message: {}", request.getRequestURI(), exception.getMessage());
        BuisnessErrorResponse error = new BuisnessErrorResponse(
                title(),
                message(),
                request.getServletPath()
        );
        return ResponseEntity.status(status()).body(error);
    }

    protected abstract HttpStatus status();
    protected abstract String message();
    protected abstract String title();
}
