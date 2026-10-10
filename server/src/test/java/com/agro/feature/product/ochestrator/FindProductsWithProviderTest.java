package com.agro.feature.product.ochestrator;

import com.agro.core.ContainerPostgresql;
import com.agro.core.TestFixtures;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.domain.ProductWithProvider;
import com.agro.feature.product.orchestrator.FindProductsWithProvider;
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
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
@Import(TestFixtures.class)
class FindProductsWithProviderTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private FindProductsWithProvider orchestrator;
    @Autowired private ProductService productService;
    @Autowired private ResetService resetService;
    @Autowired private TestFixtures fixtures;

    private TestFixtures.Tenant tenant;
    private Map<String, ProductType> types;
    private ProductType semillero;
    private ProductType tractor;
    private Provider provider1;
    private Provider provider2;

    @BeforeEach
    void setUp() {
        tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        types = fixtures.defaultTypes(tenant.owner().getId());
        semillero = types.get("Semillero");
        tractor = types.get("Tractor");

        provider1 = fixtures.provider(tenant.company().getId(), "Proveedor Uno", "30-11111111-9");
        provider2 = fixtures.provider(tenant.company().getId(), "Proveedor Dos", "30-22222222-9");
    }

    // ---------- tipo, proveedor y paginación ----------

    @Test
    void testDevuelveLosProductosDelTipoConElNombreDeSuProveedor() {
        addProduct("Semilla A", semillero, provider1);
        addProduct("Semilla B", semillero, provider2);

        Page<ProductWithProvider> page = find(semillero, 0, 10);

        assertEquals(2, page.getTotalElements());
        assertEquals("Proveedor Uno S.A.", providerNameOf(page, "Semilla A"));
        assertEquals("Proveedor Dos S.A.", providerNameOf(page, "Semilla B"));
    }

    @Test
    void testElIdDelProductoDevueltoCoincideConElProductoPersistido() {
        Product saved = addProduct("Semilla A", semillero, provider1);

        Page<ProductWithProvider> page = find(semillero, 0, 10);

        assertEquals(saved.getId(), page.getContent().get(0).idProduct());
    }

    @Test
    void testSoloDevuelveLosProductosDelTipoPedido() {
        addProduct("Semilla A", semillero, provider1);
        addProduct("Tractor X", tractor, provider1);

        Page<ProductWithProvider> page = find(semillero, 0, 10);

        assertEquals(Set.of("Semilla A"), namesOf(page));
    }

    @Test
    void testSiNoHayProductosDelTipoDevuelveUnaPaginaVacia() {
        addProduct("Tractor X", tractor, provider1);

        Page<ProductWithProvider> page = find(semillero, 0, 10);

        assertTrue(page.isEmpty());
        assertEquals(0, page.getTotalElements());
    }

    @Test
    void testRespetaElTamanioDePaginaYMantieneLosTotales() {
        addProduct("Semilla 1", semillero, provider1);
        addProduct("Semilla 2", semillero, provider1);
        addProduct("Semilla 3", semillero, provider2);
        addProduct("Semilla 4", semillero, provider2);
        addProduct("Semilla 5", semillero, provider2);

        Page<ProductWithProvider> first = find(semillero, 0, 2);
        Page<ProductWithProvider> last = find(semillero, 2, 2);

        assertEquals(2, first.getContent().size());
        assertEquals(5, first.getTotalElements());
        assertEquals(3, first.getTotalPages());
        assertEquals(1, last.getContent().size());
    }

    // ---------- aislamiento entre empresas ----------

    @Test
    void testNoMuestraProductosDeProveedoresDeOtraEmpresa() {
        Provider otherProvider = otherCompanyProvider();

        addProduct("Semilla Propia", semillero, provider1);
        addProduct("Semilla Ajena", semillero, otherProvider);

        Page<ProductWithProvider> page = find(semillero, 0, 10);

        assertTrue(namesOf(page).contains("Semilla Propia"));
        assertFalse(namesOf(page).contains("Semilla Ajena"));
    }

    // ---------- búsqueda ----------

    @Test
    void testLaBusquedaFiltraLosProductosPorNombre() {
        addProduct("Semilla Maiz", semillero, provider1);
        addProduct("Semilla Soja", semillero, provider1);
        addProduct("Girasol", semillero, provider2);

        Page<ProductWithProvider> page = find(semillero, 0, 10, "Semilla");

        assertEquals(Set.of("Semilla Maiz", "Semilla Soja"), namesOf(page));
    }

    @Test
    void testLaBusquedaNoDistingueMayusculasDeMinusculas() {
        addProduct("Semilla Maiz", semillero, provider1);
        addProduct("Girasol", semillero, provider1);

        Page<ProductWithProvider> page = find(semillero, 0, 10, "sEMILLA");

        assertEquals(Set.of("Semilla Maiz"), namesOf(page));
    }

    @Test
    void testLaBusquedaSinCoincidenciasDevuelveUnaPaginaVacia() {
        addProduct("Semilla Maiz", semillero, provider1);

        Page<ProductWithProvider> page = find(semillero, 0, 10, "Inexistente");

        assertTrue(page.isEmpty());
        assertEquals(0, page.getTotalElements());
    }

    @Test
    void testLaBusquedaNoMuestraProductosDeOtraEmpresaAunqueCoincidanEnNombre() {
        Provider otherProvider = otherCompanyProvider();

        addProduct("Semilla Propia", semillero, provider1);
        addProduct("Semilla Ajena", semillero, otherProvider);

        Page<ProductWithProvider> page = find(semillero, 0, 10, "Semilla");

        assertEquals(Set.of("Semilla Propia"), namesOf(page));
    }

    @Test
    void testLaBusquedaMantieneLosTotalesDeLaPaginacion() {
        addProduct("Semilla 1", semillero, provider1);
        addProduct("Semilla 2", semillero, provider1);
        addProduct("Semilla 3", semillero, provider2);
        addProduct("Girasol", semillero, provider2);

        Page<ProductWithProvider> page = find(semillero, 0, 2, "Semilla");

        assertEquals(2, page.getContent().size());
        assertEquals(3, page.getTotalElements());
        assertEquals(2, page.getTotalPages());
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }

    // ---------- helpers ----------

    private Product addProduct(String name, ProductType type, Provider provider) {
        return productService.add(fixtures.product(name, type.getId()), type.getId(), provider.getId());
    }

    private Provider otherCompanyProvider() {
        TestFixtures.Tenant other = fixtures.tenant("Empresa 2", "30-22222222-2", "owner2@gmail.com");
        return fixtures.provider(other.company().getId(), "Proveedor Ajeno", "30-33333333-9");
    }

    private Page<ProductWithProvider> find(ProductType type, int page, int size) {
        return find(type, page, size, "");
    }

    private Page<ProductWithProvider> find(ProductType type, int page, int size, String search) {
        return orchestrator.getPageOfProductsByType(
                type.getId(), page, size, search, tenant.owner().getId());
    }

    private Set<String> namesOf(Page<ProductWithProvider> page) {
        return page.stream().map(ProductWithProvider::name).collect(Collectors.toSet());
    }

    private String providerNameOf(Page<ProductWithProvider> page, String productName) {
        return page.stream()
                .filter(p -> p.name().equals(productName))
                .map(ProductWithProvider::nameProvider)
                .findFirst()
                .orElseThrow();
    }
}