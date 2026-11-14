package com.agro.feature.quote.exceptionHandlers;

import com.agro.feature.quote.domain.exceptions.NotDolarPrice;
import com.agro.feature.quote.dtos.calculate.response.CalculateQuoteResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class NotDolarPriceHandler {

    @ExceptionHandler
    public ResponseEntity<CalculateQuoteResponse> handle(NotDolarPrice exception) {
        return ResponseEntity
                .status(HttpStatus.PARTIAL_CONTENT)
                .body(new CalculateQuoteResponse(exception.getTotal()));
    }
}
