package com.agro.feature.product.persistence.dao;

import com.agro.feature.product.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDAO extends JpaRepository<Product, Long> {
}
