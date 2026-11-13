package com.agro.feature.quote.client;

import com.agro.feature.quote.domain.Quote;

import java.math.BigDecimal;

public interface DolarPriceClient {
    BigDecimal getDolar(Quote quote);
}
