package com.agro.feature.quote.services.impl;

import com.agro.feature.product.contracts.ProductQuoteData;
import com.agro.feature.product.contracts.ProductQuoteDataService;
import com.agro.feature.quote.domain.Quote;
import com.agro.feature.quote.services.QuoteService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class QuoteServiceImpl implements QuoteService {

    private final ProductQuoteDataService productQuoteData;

    public QuoteServiceImpl(ProductQuoteDataService productQuoteData) {
        this.productQuoteData = productQuoteData;
    }

    @Override
    public Quote calculate(Long productId, Integer quantity, List<Long> optionalIds, boolean includeFreight) {
        ProductQuoteData data = productQuoteData.findForQuote(productId, optionalIds);
        BigDecimal freight = includeFreight ? data.freight() : BigDecimal.ZERO;
        return new Quote(data.listPrice(), data.ivaRate(), freight, data.optionalPrices(), quantity);
    }
}
