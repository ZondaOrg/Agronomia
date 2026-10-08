package com.agro.feature.productType.services.impl;

import com.agro.feature.image.domain.Imagen;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.domain.exceptions.NameDuplicated;
import com.agro.feature.productType.persistence.ProductTypeDAO;
import com.agro.feature.productType.services.ProductTypeService;
import com.agro.feature.user.contracts.UserDataService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProductTypeServiceImpl implements ProductTypeService {
    private static final String DEFAULT_IMAGE_URL =
            "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166428/Default_rjsfk7.png";
    private static final String DEFAULT_IMAGE_PUBLIC_ID = "Default_rjsfk7";

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

    @Override
    public ProductType addTypeInCompany(ProductType model, Long userId) {
        if (dao.existsByName(model.getName())) {
            throw new NameDuplicated("No se puede crear tipos con nombres duplicadas");
        }
        Long idCompany = userDataService.getIdCompanyOfUserId(userId);

        model.setImagen(defaultImage());
        model.setIdCompany(idCompany);

        return dao.save(model);
    }

    @Override
    public ProductType getProductTypeById(Long id) {
        return dao.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se encontró el tipo con el id: " + id));
    }

    private static Imagen defaultImage() {
        return Imagen.builder()
                .url(DEFAULT_IMAGE_URL)
                .publicId(DEFAULT_IMAGE_PUBLIC_ID)
                .build();
    }
}
