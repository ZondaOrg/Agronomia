package com.agro.feature.quote.domain;

import com.agro.feature.quote.domain.valueObjects.DolarPrice;

import java.math.BigDecimal;

public class UsdToArsStrategy implements TotalStrategy {

    private DolarPrice dolarPrice;

    public UsdToArsStrategy(BigDecimal dolarPrice) {
        setDolarPrice(dolarPrice);
    }

    @Override
    public BigDecimal convert(BigDecimal usdTotal) {
        return usdTotal.multiply(dolarPrice.get());
    }

    private void setDolarPrice(BigDecimal dolarPrice) {
        this.dolarPrice = new DolarPrice(dolarPrice);
    }
}
