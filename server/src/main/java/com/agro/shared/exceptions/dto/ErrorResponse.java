package com.agro.shared.exceptions.dto;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record ErrorResponse(
        String id,
        String title,
        String message,
        String path,
        LocalDateTime timestamp,
        ErrorCause cause,
        List<ErrorMotive> motives) {

    public static ResponseEntity<ErrorResponse> buildResponse(HttpStatus httpStatus, String message, HttpServletRequest request) {
        return buildResponse(httpStatus, message, request, null);
    }

    public static ResponseEntity<ErrorResponse> buildResponse(HttpStatus httpStatus, String message, HttpServletRequest request, List<ErrorMotive> motives) {
        ErrorResponse errorResponse = new ErrorResponse(
                UUID.randomUUID().toString(),
                httpStatus.getReasonPhrase(),
                message,
                request.getRequestURI(),
                LocalDateTime.now(),
                ErrorCause.BUSINESS_RULE_VIOLATION,
                motives
        );
        return ResponseEntity.status(httpStatus).body(errorResponse);
    }
}