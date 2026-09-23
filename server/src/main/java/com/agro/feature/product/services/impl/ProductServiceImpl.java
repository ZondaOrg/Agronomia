package com.agro.feature.product.services.impl;

import com.agro.feature.product.domain.Product;
import com.agro.feature.product.persistence.dao.ProductDAO;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.provider.contracts.ProviderDataService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    private ProductDAO dao;
    private ProviderDataService providerContract;

    public ProductServiceImpl(ProductDAO dao, ProviderDataService providerContract) {
        this.dao = dao;
        this.providerContract = providerContract;
    }

    @Override
    public Product add(Product product, String productType, Long idProvider) {
        if(!providerContract.existProvider(idProvider)) {
            throw new EntityNotFoundException("No se puede crear un producto sin asignar un provedor");
        }
        product.assocIdProvider(idProvider);
        Optional<String> name = dao.findNameByProvider(idProvider, product.getFormatName());
        name.ifPresent(product::validateName);
        return dao.save(product);
    }

    @Override
    public Page<Product> getPageOfProducts(Integer page, Integer size, String search, Long idProvider) {
        return dao.searchPagesOfProductsWith(search, idProvider, PageRequest.of(page, size));
    }
}
