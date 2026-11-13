package com.agro.feature.product.contracts;

import java.math.BigDecimal;
import java.util.List;

public record ProductQuoteData(BigDecimal listPrice, BigDecimal ivaRate, BigDecimal freight, List<BigDecimal> optionalPrices) {
}
