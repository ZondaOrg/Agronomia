package com.agro.feature.quote.services.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.core.TestFixtures;
import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.quote.domain.Quote;
import com.agro.feature.quote.domain.exceptions.InvalidQuantityException;
import com.agro.shared.service.ResetService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
@Import(TestFixtures.class)
class QuoteServiceImplTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private QuoteServiceImpl service;
    @Autowired private ProductService productService;
    @Autowired private ResetService resetService;
    @Autowired private TestFixtures fixtures;

    @Test
    void testSiElProductoNoExisteLanzaEntityNotFoundException() {
        assertThrows(EntityNotFoundException.class,
                () -> service.calculate(0L, 1, List.of(), true));
    }

    @Test
    void testSiNoSeIncluyeElFleteElTotalNoLoSuma() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product added = productService.add(fixtures.product("Product 1", tractor.getId()), tractor.getId(), provider.getId());
        productService.edit(added, Money.ARS, 1000d, IVA.GENERAL, 1, 100d, "", new ArrayList<>(), new ArrayList<>());

        Quote quote = service.calculate(added.getId(), 1, List.of(), false);

        assertEquals(0, new BigDecimal("1210").compareTo(quote.getTotal()));
    }

    @Test
    void testSiSeIncluyeElFleteElTotalLoSuma() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product added = productService.add(fixtures.product("Product 1", tractor.getId()), tractor.getId(), provider.getId());
        productService.edit(added, Money.ARS, 1000d, IVA.GENERAL, 1, 100d, "", new ArrayList<>(), new ArrayList<>());

        Quote quote = service.calculate(added.getId(), 1, List.of(), true);

        assertEquals(0, new BigDecimal("1310").compareTo(quote.getTotal()));
    }

    @Test
    void testSiElProductoNoTieneFleteYSeIncluyeElTotalNoLoSuma() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product added = productService.add(fixtures.product("Product 1", tractor.getId()), tractor.getId(), provider.getId());

        Quote quote = service.calculate(added.getId(), 1, List.of(), true);

        assertEquals(0, new BigDecimal("12100000").compareTo(quote.getTotal()));
    }

    @Test
    void testElTotalSumaElPrecioDeLosOpcionalesSeleccionadosAntesDelIva() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product product = fixtures.product("Product 1", tractor.getId());
        Optional optional = new Optional(product, "optional 1", 100D);
        Product added = productService.add(product, tractor.getId(), provider.getId());

        Quote quote = service.calculate(added.getId(), 1, List.of(optional.getId()), true);

        assertEquals(0, new BigDecimal("12100121").compareTo(quote.getTotal()));
    }

    @Test
    void testElTotalMultiplicaElPrecioPorLaCantidadDeUnidades() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product added = productService.add(fixtures.product("Product 1", tractor.getId()), tractor.getId(), provider.getId());

        Quote quote = service.calculate(added.getId(), 3, List.of(), true);

        assertEquals(0, new BigDecimal("36300000").compareTo(quote.getTotal()));
    }

    @Test
    void testSiLaCantidadEsMenorQueUnoLanzaInvalidQuantityException() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product added = productService.add(fixtures.product("Product 1", tractor.getId()), tractor.getId(), provider.getId());

        assertThrows(InvalidQuantityException.class,
                () -> service.calculate(added.getId(), 0, List.of(), true));
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}
