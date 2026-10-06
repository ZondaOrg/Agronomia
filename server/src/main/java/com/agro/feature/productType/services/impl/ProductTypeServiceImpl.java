package com.agro.feature.productType.services.impl;

import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.persistence.ProductTypeDAO;
import com.agro.feature.productType.services.ProductTypeService;
import com.agro.feature.user.contracts.UserDataService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProductTypeServiceImpl implements ProductTypeService {
    private final ProductTypeDAO dao;

    private final UserDataService userDataService;

    public ProductTypeServiceImpl(ProductTypeDAO dao, UserDataService userDataService) {
        this.dao = dao;
        this.userDataService = userDataService;
    }

    @Override
    public List<ProductType> getAll() {
        return dao.findAll();
    }

    @Override
    public ProductType add(ProductType productType) {
        return dao.save(productType);
    }

    @Override
    public void addAllInCompany(List<ProductType> productTypes, long idCompany) {
        productTypes.forEach(productType -> productType.setIdCompany(idCompany));
        dao.saveAll(productTypes);
    }

    @Override
    public Page<ProductType> getAllPaginated(Long userId, int page, int size) {
        Long idCompany = userDataService.getIdCompanyOfUserId(userId);
        return dao.findAllByIdCompany(PageRequest.of(page, size), idCompany);
    }
}
