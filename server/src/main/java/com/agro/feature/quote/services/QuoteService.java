package com.agro.feature.quote.services;

import com.agro.feature.quote.domain.Quote;

import java.util.List;

public interface QuoteService {
    Quote calculate(Long productId, Integer quantity, List<Long> optionalIds, boolean includeFreight);
}
