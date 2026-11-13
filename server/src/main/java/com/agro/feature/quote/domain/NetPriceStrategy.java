package com.agro.feature.quote.domain;

import java.math.BigDecimal;

public class NetPriceStrategy implements TotalStrategy {

    @Override
    public BigDecimal convert(BigDecimal usdTotal) {
        return usdTotal;
    }
}
