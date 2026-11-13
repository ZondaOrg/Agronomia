package com.agro.feature.quote.dtos.calculateArs;

import com.agro.feature.quote.domain.NetPriceStrategy;
import com.agro.feature.quote.domain.Quote;
import com.agro.feature.quote.domain.UsdToArsStrategy;
import com.agro.feature.quote.dtos.calculateArs.response.CalculateArsResponse;

import java.math.BigDecimal;

public class CalculateArsMapper {

    public static CalculateArsResponse toResponse(Quote quote, BigDecimal dolarPrice) {
        quote.setStrategy(new NetPriceStrategy());
        BigDecimal totalUsd = quote.getTotal();
        quote.setStrategy(new UsdToArsStrategy(dolarPrice));
        BigDecimal totalArs = quote.getTotal();
        return new CalculateArsResponse(totalArs, totalUsd, dolarPrice, quote.toArs(dolarPrice));
    }
}
