package com.agro.feature.product.contracts;

import com.agro.core.ContainerPostgresql;
import com.agro.core.TestFixtures;
import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.provider.domain.Provider;
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
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
@Import(TestFixtures.class)
class ProductQuoteDataServiceTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private ProductQuoteDataService contract;
    @Autowired private ProductService productService;
    @Autowired private ResetService resetService;
    @Autowired private TestFixtures fixtures;

    @Test
    void testSiElProductoNoExisteLanzaEntityNotFoundException() {
        assertThrows(EntityNotFoundException.class,
                () -> contract.findForQuote(0L, List.of()));
    }

    @Test
    void testSeIncluyeElPrecioDelOpcionalSolicitado() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product product = fixtures.product("Product 1", tractor.getId());
        Optional optional = new Optional(product, "optional 1", 5D);
        Product added = productService.add(product, tractor.getId(), provider.getId());

        ProductQuoteData data = contract.findForQuote(added.getId(), List.of(optional.getId()));

        assertEquals(List.of(BigDecimal.valueOf(5D)), data.optionalPrices());
    }

    @Test
    void testNoSeIncluyeElPrecioDeUnOpcionalAjenoAlProducto() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product product = fixtures.product("Product 1", tractor.getId());
        Product other = fixtures.product("Product 2", tractor.getId());
        Optional foreign = new Optional(other, "optional ajeno", 5D);
        Product added = productService.add(product, tractor.getId(), provider.getId());
        productService.add(other, tractor.getId(), provider.getId());

        ProductQuoteData data = contract.findForQuote(added.getId(), List.of(foreign.getId()));

        assertTrue(data.optionalPrices().isEmpty());
    }

    @Test
    void testUnOpcionalConIdRepetidoSeIncluyeUnaSolaVez() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product product = fixtures.product("Product 1", tractor.getId());
        Optional optional = new Optional(product, "optional 1", 5D);
        Product added = productService.add(product, tractor.getId(), provider.getId());

        ProductQuoteData data = contract.findForQuote(added.getId(), List.of(optional.getId(), optional.getId()));

        assertEquals(1, data.optionalPrices().size());
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}
