package com.agro.feature.productType.persistence;

import com.agro.feature.productType.domain.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypeDAO extends JpaRepository<ProductType, Long> {
    Page<ProductType> findAllByIdCompany(PageRequest of, Long idCompany);
}
