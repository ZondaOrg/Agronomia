package com.agro.feature.quote.controllers;

import com.agro.core.ContainerPostgresql;
import com.agro.core.TestFixtures;
import com.agro.core.config.CacheConfig;
import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.quote.client.DolarPriceClient;
import com.agro.shared.service.ResetService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.math.BigDecimal;
import java.util.ArrayList;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@ActiveProfiles("test")
@Import(TestFixtures.class)
class QuoteControllerTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private MockMvc mockMvc;
    @Autowired private ProductService productService;
    @Autowired private ResetService resetService;
    @Autowired private TestFixtures fixtures;
    @Autowired private CacheManager cacheManager;
    @MockitoBean private DolarPriceClient dolarPriceClient;

    @Test
    @WithMockUser(roles = "DUENIO")
    void testCalculateArsResponde200ConLosTotalesEnPesosYEnDolaresElDolarOficialYElPrecioDeListaEnPesos() throws Exception {
        when(dolarPriceClient.getDolar(any())).thenReturn(new BigDecimal("1000"));
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product added = productService.add(fixtures.product("Product 1", tractor.getId()), tractor.getId(), provider.getId());
        productService.edit(added, Money.ARS, 1000d, IVA.GENERAL, 1, 100d, "", new ArrayList<>(), new ArrayList<>());

        String body = """
                {"productId": %d, "quantity": 1, "optionalIds": [], "includeFreight": true}
                """.formatted(added.getId());

        mockMvc.perform(post("/api/v1/quote/calculate-ars")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalArs").value(1310000))
                .andExpect(jsonPath("$.totalUsd").value(1310))
                .andExpect(jsonPath("$.dolarPrice").value(1000))
                .andExpect(jsonPath("$.listPriceArs").value(1000000));
    }

    @Test
    @WithMockUser(roles = "DUENIO")
    void testCalculaElTotalDeLaSeleccionYResponde200() throws Exception {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        ProductType tractor = fixtures.defaultTypes(tenant.owner().getId()).get("Tractor");
        Provider provider = fixtures.provider(tenant.company().getId());
        Product added = productService.add(fixtures.product("Product 1", tractor.getId()), tractor.getId(), provider.getId());
        productService.edit(added, Money.ARS, 1000d, IVA.GENERAL, 1, 100d, "", new ArrayList<>(), new ArrayList<>());

        String body = """
                {"productId": %d, "quantity": 1, "optionalIds": [], "includeFreight": true}
                """.formatted(added.getId());

        mockMvc.perform(post("/api/v1/quote/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total").value(1310));
    }

    @Test
    @WithMockUser(roles = "DUENIO")
    void testSiLaCantidadEsCeroResponde400() throws Exception {
        String body = """
                {"productId": 1, "quantity": 0, "optionalIds": [], "includeFreight": true}
                """;

        mockMvc.perform(post("/api/v1/quote/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "DUENIO")
    void testSiElProductIdEsNuloResponde400() throws Exception {
        String body = """
                {"productId": null, "quantity": 1, "optionalIds": [], "includeFreight": true}
                """;

        mockMvc.perform(post("/api/v1/quote/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "DUENIO")
    void testSiLosOptionalIdsSonNulosResponde400() throws Exception {
        String body = """
                {"productId": 1, "quantity": 1, "optionalIds": null, "includeFreight": true}
                """;

        mockMvc.perform(post("/api/v1/quote/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "DUENIO")
    void testSiIncludeFreightEsNuloResponde400() throws Exception {
        String body = """
                {"productId": 1, "quantity": 1, "optionalIds": [], "includeFreight": null}
                """;

        mockMvc.perform(post("/api/v1/quote/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "DUENIO")
    void testSiElProductoNoExisteResponde404() throws Exception {
        String body = """
                {"productId": 0, "quantity": 1, "optionalIds": [], "includeFreight": true}
                """;

        mockMvc.perform(post("/api/v1/quote/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isNotFound());
    }

    @AfterEach
    void tearDown() {
        cacheManager.getCache(CacheConfig.DOLAR_OFICIAL).clear();
        resetService.resetAll();
    }
}
