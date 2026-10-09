package com.agro.feature.product.services.impl;

import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.persistence.dao.OptionalDAO;
import com.agro.feature.product.persistence.dao.ProductDAO;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.productType.contract.ProductTypeDataService;
import com.agro.feature.provider.contracts.ProviderDataService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    private final ProductDAO dao;
    private final OptionalDAO optionalDao;
    private final ProviderDataService providerContract;
    private final ProductTypeDataService typeContract;

    public ProductServiceImpl(ProductDAO dao, ProviderDataService providerContract, OptionalDAO optionalDao, ProductTypeDataService typeContract) {
        this.dao = dao;
        this.providerContract = providerContract;
        this.optionalDao = optionalDao;
        this.typeContract = typeContract;
    }

    @Override
    public Product add(Product product, Long idType, Long idProvider) {
        if(!providerContract.existProvider(idProvider)) throw new EntityNotFoundException("No se puede crear un producto sin asignar un provedor");
        if(!typeContract.existType(idType)) throw new EntityNotFoundException("No se puede crear un tipo de producto");

        product.assocIdProvider(idProvider);
        Optional<String> name = dao.findNameByProvider(idProvider, product.getFormatName());
        name.ifPresent(product::validateName);
        product.assocIdType(idType);
        Product saved = dao.save(product);


        providerContract.addProduct(idProvider, saved.getId());
        return saved;
    }

    @Override
    public Page<Product> getPageOfProducts(Integer page, Integer size, String search, Long idProvider) {
        return dao.searchPagesOfProductsWith(search, idProvider, PageRequest.of(page, size));
    }


    @Override
    public Product findByIdWithinOptionals(Long id) {
        return dao.findById(id).orElseThrow(() -> new EntityNotFoundException("No se encontró el producto con el id " + id));
    }

    @Override
    public Product edit(Product product, Money money, Double listPrice, IVA iva, Integer bonification, Double freight, String desription, List<com.agro.feature.product.domain.Optional> optionalsToAdd, List<Long> idOfOptionalsToDelete) {
        List<String> optionalsToDelete = optionalDao.findNameByIdInAndProductId(idOfOptionalsToDelete, product.getId());
        product.edit(
                money,
                listPrice,
                iva,
                bonification,
                freight,
                desription,
                optionalsToDelete
        );
        optionalDao.saveAll(optionalsToAdd);
        return dao.save(product);
    }

    @Override
    public Page<Product> getPageOfProducts(Integer page, Integer size, Long idType, String search, Set<Long> providerIds) {
        if (providerIds.isEmpty()) {
            return Page.empty(PageRequest.of(page, size));
        }
        return dao.findAllByIdTypeAndProviderIds(idType, providerIds,search, PageRequest.of(page, size));
    }

}
