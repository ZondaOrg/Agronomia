package com.agro.feature.product.contracts;

import java.util.List;

public interface ProductQuoteDataService {
    ProductQuoteData findForQuote(Long productId, List<Long> optionalIds);
}
