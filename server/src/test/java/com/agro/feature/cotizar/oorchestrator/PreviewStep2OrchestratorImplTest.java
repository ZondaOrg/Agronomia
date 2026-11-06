package com.agro.feature.cotizar.oorchestrator;

import com.agro.core.ContainerPostgresql;
import com.agro.core.TestFixtures;
import com.agro.feature.cotizar.dto.response.StepPreviewResponseDTO;
import com.agro.feature.cotizar.orchestrator.previewStep2.PreviewStep2;
import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.provider.domain.Provider;
import com.agro.shared.service.ResetService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
@Import(TestFixtures.class)
class PreviewStep2OrchestratorImplTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private PreviewStep2 orchestrator;
    @Autowired private ProductService productService;
    @Autowired private ResetService resetService;
    @Autowired private TestFixtures fixtures;

    private TestFixtures.Tenant tenant;
    private ProductType semillero;
    private Provider provider;

    @BeforeEach
    void setUp() {
        tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        Map<String, ProductType> types = fixtures.defaultTypes(tenant.owner().getId());
        semillero = types.get("Semillero");

        provider = fixtures.provider(tenant.company().getId(), "Proveedor Uno", "30-11111111-9");
    }

    // ---------- datos del preview ----------

    @Test
    void testDevuelveElNombreDelProveedorYDelProducto() {
        Product product = addProduct("Semilla A");

        StepPreviewResponseDTO result =
                orchestrator.getPreview(provider.getId(), product.getId(), List.of());

        assertEquals("Proveedor Uno", result.nameProvider());
        assertEquals("Semilla A", result.nameProduct());
    }

    @Test
    void testSinOpcionalesDevuelveUnaListaVacia() {
        Product product = addProduct("Semilla A");

        StepPreviewResponseDTO result =
                orchestrator.getPreview(provider.getId(), product.getId(), List.of());

        assertTrue(result.nameOptionals().isEmpty());
    }

    @Test
    void testDevuelveLosNombresDeLosOpcionalesPedidos() {
        Product product = addProduct("Semilla A");
        List<Long> idsOptionals = createOptionals(product, "Flete", "Seguro");

        StepPreviewResponseDTO result =
                orchestrator.getPreview(provider.getId(), product.getId(), idsOptionals);

        assertEquals(2, result.nameOptionals().size());
        assertTrue(result.nameOptionals().containsAll(List.of("Flete", "Seguro")));
    }

    @Test
    void testSoloDevuelveLosOpcionalesQueSePidieron() {
        Product product = addProduct("Semilla A");
        List<Long> ids = createOptionals(product, "Flete", "Seguro", "Instalacion");

        StepPreviewResponseDTO result =
                orchestrator.getPreview(provider.getId(), product.getId(), List.of(ids.get(0)));

        assertEquals(List.of("Flete"), result.nameOptionals());
    }

    // ---------- no encontrados ----------

    @Test
    void testSiElProveedorNoExisteLanzaExcepcion() {
        Product product = addProduct("Semilla A");

        assertThrows(RuntimeException.class,
                () -> orchestrator.getPreview(999_999L, product.getId(), List.of()));
    }

    @Test
    void testSiElProductoNoExisteLanzaExcepcion() {
        assertThrows(RuntimeException.class,
                () -> orchestrator.getPreview(provider.getId(), 999_999L, List.of()));
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }

    // ---------- helpers ----------

    private Product addProduct(String name) {
        return productService.add(fixtures.product(name, semillero.getId()), semillero.getId(), provider.getId());
    }

    private List<Long> createOptionals(Product product, String... names) {
        return fixtures.optionals(product, names).stream()
                .map(Optional::getId)
                .toList();
    }
}