package com.agro.feature.product.orchestrator;

import com.agro.feature.product.domain.ProductWithProvider;
import org.springframework.data.domain.Page;

public interface FindProductsWithProvider {
    Page<ProductWithProvider> getPageOfProductsByType(Long typeId, Integer page, Integer size, String search,Long userId);
}
