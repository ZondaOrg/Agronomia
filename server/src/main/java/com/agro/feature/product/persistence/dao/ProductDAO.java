package com.agro.feature.product.persistence.dao;

import com.agro.feature.product.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductDAO extends JpaRepository<Product, Long> {
    @Query(
            "SELECT p.name.value " +
            "FROM Product p " +
            "WHERE p.provider_id = :idProvider AND p.name.value = :productName"
    )
    Optional<String> findNameByProvider(
            @Param("idProvider") Long idProvider,
            @Param("productName") String productName
    );
}
