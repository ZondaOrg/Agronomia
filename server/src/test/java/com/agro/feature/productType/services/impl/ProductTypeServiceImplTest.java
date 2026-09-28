package com.agro.feature.productType.services.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.persistence.ProductTypeDAO;
import com.agro.shared.service.ResetService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.util.List;
import java.util.Objects;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Testcontainers
class ProductTypeServiceImplTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired
    private ProductTypeServiceImpl service;

    @Autowired
    private ProductTypeDAO dao;

    @Autowired
    private ResetService reset;

    private ProductType productType;

    @BeforeEach
    void setUp() {
        productType = new ProductType("Tractorcito");
    }

    @Test
    void testSeAgregaUnTipoDeProcuto() {
        ProductType addedProductType = service.add(productType);
        assertNotNull(addedProductType.getId());
    }

    @Test
    void testSeRecuperanTodosLosTiposDeProductos() {
        service.add(new ProductType("Pala"));
        service.add(new ProductType("Cosechadora"));
        List<ProductType> productTypes = service.getAll();
        assertTrue(productTypes.stream().anyMatch(productType -> Objects.equals(productType.getName(), "Tractorcito")));
        assertTrue(productTypes.stream().anyMatch(productType -> Objects.equals(productType.getName(), "Cosechadora")));
    }

    @AfterEach
    void tearDown() {
    }
}