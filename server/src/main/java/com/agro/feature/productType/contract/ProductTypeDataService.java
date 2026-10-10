package com.agro.feature.productType.contract;

import com.agro.feature.productType.domain.ProductType;

public interface ProductTypeDataService {
    boolean existType(Long idType);
    ProductType addTypeInCompany(ProductType model, Long userId);
}
