package com.agro.feature.product.services.impl;

import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.persistence.dao.OptionalDAO;
import com.agro.feature.product.persistence.dao.ProductDAO;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.provider.contracts.ProviderDataService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    private ProductDAO dao;
    private OptionalDAO optionalDao;
    private ProviderDataService providerContract;

    public ProductServiceImpl(ProductDAO dao, ProviderDataService providerContract, OptionalDAO optionalDao) {
        this.dao = dao;
        this.providerContract = providerContract;
        this.optionalDao = optionalDao;
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

    @Override
    public Product findById(Long id) {
        return dao.findByIdWithOptionals(id).orElseThrow(() -> new EntityNotFoundException("No se encontró el producto con el id " + id));
    }

    @Override
    public Product edit(Product product, Money money, Double listPrice, IVA iva, Integer bonification, Double freight, List<com.agro.feature.product.domain.Optional> optionalsToAdd, List<Long> idOfOptionalsToDelete) {
        List<String> optionalsToDelete = optionalDao.findNameByIdInAndProductId(idOfOptionalsToDelete, product.getId());
        product.edit(
                money,
                listPrice,
                iva,
                bonification,
                freight,
                optionalsToDelete
        );
        optionalDao.saveAll(optionalsToAdd);
        return dao.save(product);
    }

    private Product findBy(Long id) {
        return dao.findByIdWithOptionals(id).orElseThrow(() -> new EntityNotFoundException("No se encontró el producto con el id " + id));
    }
}
