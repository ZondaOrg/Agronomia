package com.agro.feature.product.orchestrator.impl;

import com.agro.feature.product.domain.Product;
import com.agro.feature.product.domain.ProductWithProvider;
import com.agro.feature.product.orchestrator.FindProductsWithProvider;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.provider.contracts.ProviderDataService;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.user.contracts.UserDataService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class FindProductsWithProviderImpl implements FindProductsWithProvider {

    private final ProductService productService;
    private final ProviderDataService providerDataService;
    private final UserDataService userDataService;

    public FindProductsWithProviderImpl(ProductService productService, ProviderDataService providerDataService, UserDataService userDataService) {
        this.productService = productService;
        this.providerDataService = providerDataService;
        this.userDataService = userDataService;
    }

    @Override
    public Page<ProductWithProvider> getPageOfProductsByType(Long typeId, Integer page, Integer size, Long userId) {
        Long idCompany = userDataService.getIdCompanyOfUserId(userId);
        List<Provider> providers = providerDataService.getProvidersByCompany(idCompany);

        Map<Long, String> providerNameById = providers.stream()
                .collect(Collectors.toMap(Provider::getId, Provider::getLegalName, (a, b) -> a));

        Page<Product> productPage = productService.getPageOfProducts(page, size, typeId, providerNameById.keySet());

        return productPage.map(product -> new ProductWithProvider(
                product.getId(),
                product.getName(),
                providerNameById.get(product.getProvider_id())
        ));
    }
}
