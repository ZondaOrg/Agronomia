package com.agro.feature.quote.services;

import com.agro.feature.quote.domain.Quote;

import java.math.BigDecimal;

public interface DolarPriceService {
    BigDecimal get(Quote quote);
}
