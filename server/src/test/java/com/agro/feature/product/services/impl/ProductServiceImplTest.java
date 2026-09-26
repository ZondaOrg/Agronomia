package com.agro.feature.product.services.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Optional;
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
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

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

    @Test
    void testUnaBusquedaPaginaTraeTodosLosProductosDelProveedor() {
        service.add(
                new Product(
                "Product 1",
                "product nss",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                        "a",
                20
                ), "type", provider.getId());
        service.add(new Product(
                "Product 2",
                "product nss",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
                20
        ), "type", provider.getId());
        service.add(new Product(
                "Product 3",
                "product nss",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
                20
        ), "type", provider.getId());
        service.add(new Product(
                "Product 4",
                "product nss",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
                20
        ), "type", provider.getId());
        Page<Product> pageOfProducts = service.getPageOfProducts(0, 5, "", provider.getId());
        assertTrue(pageOfProducts.stream().anyMatch(page -> Objects.equals(page.getName(), "Product 1")));
        assertTrue(pageOfProducts.stream().anyMatch(page -> Objects.equals(page.getName(), "Product 2")));
        assertTrue(pageOfProducts.stream().anyMatch(page -> Objects.equals(page.getName(), "Product 3")));
        assertTrue(pageOfProducts.stream().anyMatch(page -> Objects.equals(page.getName(), "Product 4")));
    }

    @Test
    void testUnaBusquedaPaginaFiltraLosProductosDelProveedor() {
        String filter = "Tractor";

        service.add(new Product(
                "Tractorcito 1",
                        "product nss",
                        Money.ARS,
                        10000000d,
                        IVA.GENERAL,
                        "a",
                        20
                ),
                "type",
                provider.getId());
        service.add(new Product(
                "tractorcito 2",
                "product nss",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
                20
        ), "type", provider.getId());
        service.add(new Product(
                "Casechadora 3",
                "product nss",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
                20
        ), "type", provider.getId());
        service.add(new Product(
                "Casechadora 4",
                "product nss",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
                20
        ), "type", provider.getId());
        Page<Product> pageOfProducts = service.getPageOfProducts(0, 5, filter, provider.getId());
        assertTrue(pageOfProducts.stream().anyMatch(page -> Objects.equals(page.getName(), "Tractorcito 1")));
        assertTrue(pageOfProducts.stream().anyMatch(page -> Objects.equals(page.getName(), "tractorcito 2")));
        assertFalse(pageOfProducts.stream().anyMatch(page -> Objects.equals(page.getName(), "Casechadora 3")));
    }

    @Test
    void testSeRecuperaUnProductoPorSuId() {
        Product addedProduct = service.add(product, "Camionetita", provider.getId());
        Product pruductFound = service.findById(addedProduct.getId());
        assertEquals(addedProduct.getId(), pruductFound.getId());
    }

    @Test
    void testSeRecuperaUnProductoPorSuIdConSusOpcionales() {
        Optional optional = new Optional(product, "optional 1", 5D);
        Product addedProduct = service.add(product, "Camionetita", provider.getId());
        Product pruductFound = service.findById(addedProduct.getId());
        assertTrue(pruductFound.getOptionals().stream().anyMatch(o -> Objects.equals(o.getName(), optional.getName())));
    }

    @Test
    void testSeEditaLosCamposDeUnProducto() {
        Optional optional = new Optional(product, "optional 1", 5D);
        Product addedProduct = service.add(product, "Camionetita", provider.getId());
        Product editedProduct = service.edit(addedProduct.getId(), Money.USD, 1025007d, IVA.REDUCIDA, 50, 8D, new ArrayList<Long>());
        assertEquals(Money.USD, editedProduct.getMoney());
        assertEquals(1025007d, editedProduct.getListPrice());
        assertEquals(IVA.REDUCIDA, editedProduct.getIva());
        assertEquals(50, editedProduct.getBonification());
        assertEquals(8D, editedProduct.getFreight());
    }

    @Test
    void testSeAgregaOpcionalesAlEditarUnProducto() {
        Optional optional = new Optional(product, "optional 1", 5D);
        Product addedProduct = service.add(product, "Camionetita", provider.getId());
        Product editedProduct = service.edit(addedProduct.getId(), Money.USD, 1025007d, IVA.REDUCIDA, 50, 8D, new ArrayList<Long>());
        assertTrue(editedProduct.getOptionals().stream().anyMatch(o -> Objects.equals(o.getName(), optional.getName())));
    }

    @Test
    void testSeEliminanOpcionalesAlEditarUnProducto() {
        Optional optional = new Optional(product, "optional 1", 5D);
        Product addedProduct = service.add(product, "Camionetita", provider.getId());
        List<Long> toDelete = new ArrayList<Long>();
        toDelete.add(addedProduct.getOptionals().getFirst().getId());
        Product editedProduct = service.edit(addedProduct.getId(), Money.USD, 1025007d, IVA.REDUCIDA, 50, 8D, toDelete);
        assertTrue(editedProduct.getOptionals().isEmpty());
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}