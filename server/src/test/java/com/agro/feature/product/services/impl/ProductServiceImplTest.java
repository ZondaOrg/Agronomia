package com.agro.feature.product.services.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.domain.exceptions.SameProductNameException;
import com.agro.feature.product.persistence.dao.ProductDAO;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.service.ProviderService;
import com.agro.shared.service.ResetService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
class ProductServiceImplTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired
    private ProductServiceImpl service;

    @Autowired
    private ProductDAO dao;

    @Autowired
    private ResetService resetService;

    @Autowired
    private ProviderService addedProviderService;

    private Product product;

    private Provider provider;

    @BeforeEach
    void setUp() {
        product = new Product(
                "Product Same",
                "product nss",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
                20
        );
        Provider newProvider = Provider.builder()
                .tradeName("Proveedor Test")
                .legalName("Proveedor Test S.A.")
                .cuit("30-11111111-9")
                .phoneNumber("11-1234-5678")
                .companyId(1L)
                .build();

        provider = addedProviderService.save(newProvider);
    }

    @Test
    void testSeAgregaUnProducto() {
        Product addedProduct = service.add(product, "type", provider.getId());
        assertNotNull(addedProduct.getId());
    }

    @Test
    void testSiSeIntentaCrearUnProductoParaUnProvedorInexistente_LanzaExcepcion() {
        assertThrows(EntityNotFoundException.class, () -> service.add(product, "type", 0L));
    }

    @Test
    void testAlCrearUnProductoConNombreYaRegistradoParaUnProvedor_LanzaExcepcion() {
        Product failProduct = new Product(
                "Product Same",
                "product nss",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
                20
        );
        service.add(product, "type", provider.getId());
        assertThrows(SameProductNameException.class, () -> service.add(failProduct, "type", provider.getId()));
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}