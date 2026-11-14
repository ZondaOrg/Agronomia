package com.agro.feature.quote.domain.exceptions;

import lombok.Getter;

import java.math.BigDecimal;

public class NotDolarPrice extends RuntimeException {

    @Getter
    private BigDecimal total;

    public NotDolarPrice(String message, BigDecimal total) {
        super(message);
        this.total = total;
    }
}
