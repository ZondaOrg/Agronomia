package com.agro.feature.productType.persistence;

import com.agro.feature.productType.domain.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductTypeDAO extends JpaRepository<ProductType, Long> {
    Page<ProductType> findAllByIdCompany(PageRequest of, Long idCompany);

    List<ProductType> findAllByIdCompany(Long idCompany);

    @Query("""
        SELECT COUNT(p) > 0
        FROM ProductType p
        WHERE LOWER(p.name) = LOWER(:name)
        """)
    boolean existsByName(@Param("name") String name);
}
