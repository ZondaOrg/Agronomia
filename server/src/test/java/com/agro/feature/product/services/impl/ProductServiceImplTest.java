package com.agro.feature.product.services.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.core.TestFixtures;
import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.domain.exceptions.SameProductNameException;
import com.agro.feature.product.persistence.dao.ProductDAO;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.provider.contracts.ProviderDataService;
import com.agro.feature.provider.domain.Provider;
import com.agro.shared.service.ResetService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
@Import(TestFixtures.class)
class ProductServiceImplTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private ProductServiceImpl service;
    @Autowired private ProductDAO dao;
    @Autowired private ResetService resetService;
    @Autowired private ProviderDataService providerService;
    @Autowired private TestFixtures fixtures;

    private TestFixtures.Tenant tenant;
    private Map<String, ProductType> types;
    private ProductType semillero;
    private ProductType tractor;
    private Provider provider;
    private Product product;

    @BeforeEach
    void setUp() {
        tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        types = fixtures.defaultTypes(tenant.owner().getId());
        semillero = types.get("Semillero");
        tractor = types.get("Tractor");

        provider = fixtures.provider(tenant.company().getId());
        product = fixtures.product("Product Same", semillero.getId());
    }

    @Test
    void testSeAgregaUnProducto() {
        Product addedProduct = service.add(product, semillero.getId(), provider.getId());

        Provider recovered = providerService.getProviderById(provider.getId());

        assertNotNull(addedProduct.getId());
        assertTrue(recovered.getPriceList().contains(addedProduct.getId()));
    }

    @Test
    void testSiSeIntentaCrearUnProductoParaUnProvedorInexistente_LanzaExcepcion() {
        assertThrows(EntityNotFoundException.class,
                () -> service.add(product, semillero.getId(), 0L));
    }

    @Test
    void testAlCrearUnProductoConNombreYaRegistradoParaUnProvedor_LanzaExcepcion() {
        Product failProduct = fixtures.product("Product Same", semillero.getId());
        service.add(product, semillero.getId(), provider.getId());

        assertThrows(SameProductNameException.class,
                () -> service.add(failProduct, semillero.getId(), provider.getId()));
    }

    @Test
    void testUnaBusquedaPaginaTraeTodosLosProductosDelProveedor() {
        addProducts("Product 1", "Product 2", "Product 3", "Product 4");

        Page<Product> page = service.getPageOfProducts(0, 5, "", provider.getId());

        assertTrue(hasProduct(page, "Product 1"));
        assertTrue(hasProduct(page, "Product 2"));
        assertTrue(hasProduct(page, "Product 3"));
        assertTrue(hasProduct(page, "Product 4"));
    }

    @Test
    void testUnaBusquedaPaginaFiltraLosProductosDelProveedor() {
        addProducts("Tractorcito 1", "tractorcito 2", "Casechadora 3", "Casechadora 4");

        Page<Product> page = service.getPageOfProducts(0, 5, "Tractor", provider.getId());

        assertTrue(hasProduct(page, "Tractorcito 1"));
        assertTrue(hasProduct(page, "tractorcito 2"));
        assertFalse(hasProduct(page, "Casechadora 3"));
    }

    @Test
    void testSeRecuperaUnProductoPorSuId() {
        Product addedProduct = service.add(product, tractor.getId(), provider.getId());

        Product found = service.findByIdWithinOptionals(addedProduct.getId());

        assertEquals(addedProduct.getId(), found.getId());
    }

    @Test
    void testSeRecuperaUnProductoPorSuIdConSusOpcionales() {
        Optional optional = new Optional(product, "optional 1", 5D);
        Product addedProduct = service.add(product, tractor.getId(), provider.getId());

        Product found = service.findByIdWithinOptionals(addedProduct.getId());

        assertTrue(found.getOptionals().stream()
                .anyMatch(o -> Objects.equals(o.getName(), optional.getName())));
    }

    @Test
    void testSeEditaLosCamposDeUnProducto() {
        Product addedProduct = service.add(product, tractor.getId(), provider.getId());

        Product edited = service.edit(addedProduct, Money.USD, 1025007d, IVA.REDUCIDA, 50, 8D,
                "nueva descripción", new ArrayList<>(), new ArrayList<Long>());

        assertEquals(Money.USD, edited.getMoney());
        assertEquals(1025007d, edited.getListPrice());
        assertEquals(IVA.REDUCIDA, edited.getIva());
        assertEquals(50, edited.getBonification());
        assertEquals(8D, edited.getFreight());
        assertEquals("nueva descripción", edited.getDescription());
    }

    @Test
    void testSeAgregaOpcionalesAlEditarUnProducto() {
        Product addedProduct = service.add(product, tractor.getId(), provider.getId());

        Optional optional = new Optional(addedProduct, "optional 1", 5D);
        List<Optional> toAdd = new ArrayList<>(List.of(optional));

        Product edited = service.edit(addedProduct, Money.USD, 1025007d, IVA.REDUCIDA, 50, 8D,
                "", toAdd, new ArrayList<Long>());

        assertTrue(edited.getOptionals().stream()
                .anyMatch(o -> Objects.equals(o.getName(), optional.getName())));
    }

    @Test
    void testSeEliminanOpcionalesAlEditarUnProducto() {
        Optional optional = new Optional(product, "optional 1", 5D);
        Product addedProduct = service.add(product, tractor.getId(), provider.getId());

        List<Long> toDelete = new ArrayList<>(List.of(optional.getId()));

        Product edited = service.edit(addedProduct, Money.USD, 1025007d, IVA.REDUCIDA, 50, 8D,
                "", new ArrayList<>(), toDelete);

        assertTrue(edited.getOptionals().isEmpty());
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }

    private void addProducts(String... names) {
        for (String name : names) {
            service.add(fixtures.product(name, semillero.getId()), semillero.getId(), provider.getId());
        }
    }

    private boolean hasProduct(Page<Product> page, String name) {
        return page.stream().anyMatch(p -> p.hasName(name));
    }
}