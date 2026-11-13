package com.agro.feature.quote.domain;

import com.agro.feature.quote.domain.exceptions.NegativeAmountException;

import java.math.BigDecimal;

public class UsdToArsStrategy implements TotalStrategy {

    public UsdToArsStrategy(BigDecimal dolarPrice) {
        if (dolarPrice.signum() <= 0) {
            throw new NegativeAmountException("dólar");
        }
    }

    @Override
    public BigDecimal convert(BigDecimal usdTotal) {
        throw new UnsupportedOperationException();
    }
}
