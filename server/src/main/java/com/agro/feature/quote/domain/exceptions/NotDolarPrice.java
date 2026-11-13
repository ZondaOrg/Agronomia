package com.agro.feature.quote.domain.exceptions;

import java.math.BigDecimal;

public class NotDolarPrice extends RuntimeException {

    private BigDecimal total;

    public NotDolarPrice(String message, BigDecimal total) {
        super(message);
        this.total = total;
    }
}
