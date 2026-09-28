package com.agro.core.handlers.model;

import com.agro.shared.valueObjects.email.EmailDuplicatedException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class EmailDuplicatedHandler extends BuisnessHandlerException<EmailDuplicatedException>{

    @ExceptionHandler(EmailDuplicatedException.class)
    public ResponseEntity<BuisnessErrorResponse> handleEmailDuplicated(
            EmailDuplicatedException exception,
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
        return "El email ya se encuentra registrado";
    }

    @Override
    protected String title() {
        return "Email repetido";
    }
}
