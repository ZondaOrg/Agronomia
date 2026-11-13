package com.agro.feature.product.controller;

import com.agro.core.ContainerPostgresql;
import com.agro.core.TestFixtures;
import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.provider.domain.Provider;
import com.agro.shared.service.ResetService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@ActiveProfiles("test")
@Import(TestFixtures.class)
class ProductControllerTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private MockMvc mockMvc;
    @Autowired private ProductService productService;
    @Autowired private ResetService resetService;
    @Autowired private TestFixtures fixtures;

    @Test
    @WithMockUser(roles = "DUENIO")
    void testLaBusquedaPorProveedorResponde200ConElIdYElNombreDeLosProductos() throws Exception {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product added = productService.add(fixtures.product("Tractor Grande", tractor.getId()), tractor.getId(), provider.getId());

        mockMvc.perform(get("/api/v1/product/provider/{providerId}/search", provider.getId())
                        .param("search", "tractor"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(added.getId()))
                .andExpect(jsonPath("$[0].name").value("Tractor Grande"));
    }

    @Test
    @WithMockUser(roles = "DUENIO")
    void testLaBusquedaPorProveedorSinCriterioDevuelveTodosLosProductosDelProveedor() throws Exception {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        productService.add(fixtures.product("Tractor Grande", tractor.getId()), tractor.getId(), provider.getId());
        productService.add(fixtures.product("Sembradora", tractor.getId()), tractor.getId(), provider.getId());

        mockMvc.perform(get("/api/v1/product/provider/{providerId}/search", provider.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @WithMockUser(roles = "VENDEDOR")
    void testUnVendedorPuedeBuscarLosProductosDeUnProveedor() throws Exception {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        productService.add(fixtures.product("Tractor Grande", tractor.getId()), tractor.getId(), provider.getId());

        mockMvc.perform(get("/api/v1/product/provider/{providerId}/search", provider.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    @WithMockUser(roles = "VENDEDOR")
    void testObtenerProductoParaCotizarResponde200ConSusDatosYOpcionales() throws Exception {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product product = fixtures.product("Tractor Grande", tractor.getId());
        new Optional(product, "optional 1", 5D);
        Product added = productService.add(product, tractor.getId(), provider.getId());

        mockMvc.perform(get("/api/v1/product/{productId}/quote", added.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(added.getId()))
                .andExpect(jsonPath("$.name").value("Tractor Grande"))
                .andExpect(jsonPath("$.money").value("ARS"))
                .andExpect(jsonPath("$.listPrice").value(added.getListPrice()))
                .andExpect(jsonPath("$.iva").value("GENERAL"))
                .andExpect(jsonPath("$.freight").exists())
                .andExpect(jsonPath("$.optionals.length()").value(1))
                .andExpect(jsonPath("$.optionals[0].name").value("optional 1"))
                .andExpect(jsonPath("$.optionals[0].price").value(5D));
    }

    @Test
    @WithMockUser(roles = "DUENIO")
    void testObtenerProductoParaCotizarSinOpcionalesDevuelveListaVacia() throws Exception {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product added = productService.add(fixtures.product("Tractor Grande", tractor.getId()), tractor.getId(), provider.getId());

        mockMvc.perform(get("/api/v1/product/{productId}/quote", added.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.optionals.length()").value(0));
    }

    @Test
    @WithMockUser(roles = "DUENIO")
    void testSiElProductoNoExisteParaCotizarResponde404() throws Exception {
        mockMvc.perform(get("/api/v1/product/{productId}/quote", 999999L))
                .andExpect(status().isNotFound());
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}
