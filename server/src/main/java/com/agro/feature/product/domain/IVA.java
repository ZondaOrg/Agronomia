package com.agro.feature.product.domain;

import java.math.BigDecimal;

public enum IVA {
    GENERAL("0.21"),
    REDUCIDA("0.105");

    private final BigDecimal rate;

    IVA(String rate) {
        this.rate = new BigDecimal(rate);
    }

    public BigDecimal rate() {
        return rate;
    }
}
