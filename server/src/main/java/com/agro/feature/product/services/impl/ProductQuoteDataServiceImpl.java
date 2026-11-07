package com.agro.feature.product.services.impl;

import com.agro.feature.product.contracts.ProductQuoteData;
import com.agro.feature.product.contracts.ProductQuoteDataService;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.persistence.dao.OptionalDAO;
import com.agro.feature.product.persistence.dao.ProductDAO;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class ProductQuoteDataServiceImpl implements ProductQuoteDataService {

    private final ProductDAO dao;
    private final OptionalDAO optionalDao;

    public ProductQuoteDataServiceImpl(ProductDAO dao, OptionalDAO optionalDao) {
        this.dao = dao;
        this.optionalDao = optionalDao;
    }

    @Override
    public ProductQuoteData findForQuote(Long productId, List<Long> optionalIds) {
        Product product = dao.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("No se encontró el producto con el id " + productId));
        return new ProductQuoteData(
                BigDecimal.valueOf(product.getListPrice()),
                product.getIva().rate(),
                BigDecimal.valueOf(product.getFreight()),
                optionalPrices(product, optionalIds));
    }

    private List<BigDecimal> optionalPrices(Product product, List<Long> optionalIds) {
        return optionalDao.findPriceByIdInAndProductId(optionalIds, product.getId()).stream()
                .map(BigDecimal::valueOf)
                .toList();
    }
}
