package com.agro.feature.quote.domain;

import java.math.BigDecimal;

public interface TotalStrategy {

    BigDecimal convert(BigDecimal usdTotal);
}
