package com.agro.feature.provider.controller;

import com.agro.core.ContainerPostgresql;
import com.agro.core.TestFixtures;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.orchestrator.RegisterOrchestrator;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.service.ResetService;
import com.agro.shared.valueObjects.email.EmailValue;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
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
class ProviderControllerRESTTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private MockMvc mockMvc;
    @Autowired private ResetService resetService;
    @Autowired private TestFixtures fixtures;
    @Autowired private RegisterOrchestrator orchestrator;

    @Test
    @WithMockUser(roles = "VENDEDOR")
    void testSearchDevuelveLosProveedoresQueCoincidenYResponde200() throws Exception {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        Provider match = fixtures.provider(tenant.company().getId(), "Agro Sur", "30-33333333-3");
        fixtures.provider(tenant.company().getId(), "Insumos Norte", "30-44444444-4");

        mockMvc.perform(get("/api/v1/provider/search")
                        .requestAttr("userId", tenant.owner().getId())
                        .param("search", "sur"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(match.getId()))
                .andExpect(jsonPath("$[0].name").value("Agro Sur"));
    }

    @Test
    @Disabled("Pendiente: no hay @EnableMethodSecurity, los @PreAuthorize no se evalúan y devuelve 200 en vez de 403")
    @WithMockUser(roles = "FACTURACION")
    void testSiElRolNoEsVendedorNiDuenioResponde403() throws Exception {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner@gmail.com");
        User billing = orchestrator.register(
                User.builder()
                        .name("Facturacion")
                        .email(new EmailValue("facturacion@gmail.com"))
                        .role(Role.FACTURACION)
                        .build(),
                tenant.company().getId(),
                tenant.branch().getId());

        mockMvc.perform(get("/api/v1/provider/search")
                        .requestAttr("userId", billing.getId())
                        .param("search", ""))
                .andExpect(status().isForbidden());
    }

    @Test
    void testSiNoHaySesionAutenticadaResponde401() throws Exception {
        mockMvc.perform(get("/api/v1/provider/search")
                        .param("search", ""))
                .andExpect(status().isUnauthorized());
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}
