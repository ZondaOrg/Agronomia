package com.agro.feature.quote.dtos.calculateArsManual;

import com.agro.feature.quote.domain.NetPriceStrategy;
import com.agro.feature.quote.domain.Quote;
import com.agro.feature.quote.domain.UsdToArsStrategy;
import com.agro.feature.quote.dtos.calculateArsManual.response.CalculateArsManualResponse;

import java.math.BigDecimal;

public class CalculateArsManualMapper {

    public static CalculateArsManualResponse toResponse(Quote quote, BigDecimal dolarPrice) {
        quote.setStrategy(new NetPriceStrategy());
        BigDecimal totalUsd = quote.getTotal();
        quote.setStrategy(new UsdToArsStrategy(dolarPrice));
        BigDecimal totalArs = quote.getTotal();
        return new CalculateArsManualResponse(totalArs, totalUsd, dolarPrice, quote.toArs(dolarPrice));
    }
}
