package com.agro.feature.quote.domain;

import com.agro.feature.quote.domain.exceptions.NegativeAmountException;

import java.math.BigDecimal;

public class UsdToArsStrategy implements TotalStrategy {

    private BigDecimal dolarPrice;

    public UsdToArsStrategy(BigDecimal dolarPrice) {
        setDolarPrice(dolarPrice);
    }

    @Override
    public BigDecimal convert(BigDecimal usdTotal) {
        return usdTotal.multiply(dolarPrice);
    }

    private void setDolarPrice(BigDecimal dolarPrice) {
        if (dolarPrice.signum() <= 0) {
            throw new NegativeAmountException("dólar");
        }
        this.dolarPrice = dolarPrice;
    }
}
