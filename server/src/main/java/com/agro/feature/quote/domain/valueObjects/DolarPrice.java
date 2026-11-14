package com.agro.feature.quote.domain.valueObjects;

import com.agro.feature.quote.domain.exceptions.NegativeAmountException;

import java.math.BigDecimal;

public class DolarPrice {

    private final BigDecimal value;

    public DolarPrice(BigDecimal value) {
        if (value.signum() <= 0) {
            throw new NegativeAmountException("dólar");
        }
        this.value = value;
    }

    public BigDecimal get() {
        return value;
    }
}
