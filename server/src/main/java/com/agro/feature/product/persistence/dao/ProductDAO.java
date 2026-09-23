package com.agro.feature.product.persistence.dao;

import com.agro.feature.product.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductDAO extends JpaRepository<Product, Long> {
    @Query(
            "SELECT p.name.normalizeValue " +
            "FROM Product p " +
            "WHERE p.provider_id = :idProvider AND p.name.normalizeValue = :productName"
    )
    Optional<String> findNameByProvider(
            @Param("idProvider") Long idProvider,
            @Param("productName") String productName
    );
    @Query(
        "SELECT p " +
        "FROM Product p " +
        "WHERE p.provider_id = :idProvider " +
        "AND LOWER(p.name.value) LIKE LOWER(CONCAT('%', :search, '%')) " +
        "ORDER BY p.name.value ASC"
    )
    Page<Product> searchPagesOfProductsWith(
            @Param("search") String search,
            @Param("idProvider") Long idProvider,
            PageRequest pageRequest);
}
