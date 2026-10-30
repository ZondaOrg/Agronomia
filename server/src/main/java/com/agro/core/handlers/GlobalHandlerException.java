package com.agro.core.handlers;

import com.agro.shared.dtos.error.CauseError;
import com.agro.shared.dtos.error.RestErrorResponse;
import com.agro.shared.exceptions.ConflictException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalHandlerException {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<RestErrorResponse> handleConflictExcerption(EntityNotFoundException exception, HttpServletRequest request) {
        RestErrorResponse error = new RestErrorResponse(
                "Entity Not Found",
                "The entity has not been found",
                request.getServletPath(),
                CauseError.ENTITY_NOT_FOUND
        );
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<RestErrorResponse> handleConflictExcerption(ConflictException exception, HttpServletRequest request) {
        log.warn("Conflict rule violation - URI: {} | Message: {}", request.getRequestURI(), exception.getMessage());
        RestErrorResponse error = new RestErrorResponse(
                "Conflict rule violation",
                exception.getMessage(),
                request.getServletPath(),
                CauseError.CONFLICT_RULE_VIOLATION
        );
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestErrorResponse> bodyError(MethodArgumentNotValidException exception, BindingResult errorResult, HttpServletRequest request) {
        List<ErrorResponse> errors =  errorResult.getFieldErrors().stream().map(error -> new ErrorResponse(error.getField(), error.getDefaultMessage())).toList();
        RestErrorResponse response = new RestErrorResponse(
                "Error in the request body",
                errors.stream()
                        .map(ErrorResponse::message)
                        .collect(Collectors.joining(", ")),
                request.getServletPath(),
                CauseError.BODY_SCHEMA_ERROR
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<RestErrorResponse> parseJsonError(HttpMessageNotReadableException exception, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(exception.getCause().getMessage(), exception.getMessage());
        RestErrorResponse response = new RestErrorResponse(
                "Error in the request body",
                error.message(),
                request.getServletPath(),
                CauseError.BODY_SCHEMA_ERROR
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
