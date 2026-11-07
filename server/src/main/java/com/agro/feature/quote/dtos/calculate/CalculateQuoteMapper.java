package com.agro.feature.quote.dtos.calculate;

import com.agro.feature.quote.domain.Quote;
import com.agro.feature.quote.dtos.calculate.response.CalculateQuoteResponse;

public class CalculateQuoteMapper {

    public static CalculateQuoteResponse toResponse(Quote quote) {
        return new CalculateQuoteResponse(quote.getTotal());
    }
}
