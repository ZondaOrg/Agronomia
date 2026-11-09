package com.agro.feature.provider.service.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.core.TestFixtures;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.persistence.projections.SearchProviderProjection;
import com.agro.feature.provider.service.ProviderService;
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

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
@Import(TestFixtures.class)
public class ProviderServiceImplTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private ProviderService providerService;
    @Autowired private ResetService resetService;
    @Autowired private TestFixtures fixtures;

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }

    @Test
    void testSiElUsuarioNoExisteLanzaEntityNotFoundException() {
        assertThrows(EntityNotFoundException.class,
                () -> providerService.search(0L, ""));
    }

    @Test
    void testSoloDevuelveLosProveedoresDeLaCompaniaDelUsuario() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner1@gmail.com");
        TestFixtures.Tenant otherTenant = fixtures.tenant("Empresa 2", "30-22222222-2", "owner2@gmail.com");
        Provider own = fixtures.provider(tenant.company().getId(), "Agro Sur", "30-33333333-3");
        Provider foreign = fixtures.provider(otherTenant.company().getId(), "Agro Norte", "30-44444444-4");

        List<SearchProviderProjection> result = providerService.search(tenant.owner().getId(), "");

        assertEquals(List.of(new SearchProviderProjection(own.getId(), "Agro Sur")), result);
        assertFalse(result.stream().anyMatch(p -> p.id().equals(foreign.getId())));
    }

    @Test
    void testFiltraPorTradeNameOLegalName() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner1@gmail.com");
        Long companyId = tenant.company().getId();
        Provider byTradeName = fixtures.provider(companyId, "Agro Sur", "30-33333333-3");
        Provider byLegalName = providerService.save(Provider.builder()
                .tradeName("Insumos Pampa")
                .legalName("Semillas del Sur S.R.L.")
                .cuit("30-44444444-4")
                .phoneNumber("11-1234-5678")
                .companyId(companyId)
                .build());
        fixtures.provider(companyId, "Insumos Norte", "30-55555555-5");

        List<SearchProviderProjection> result = providerService.search(tenant.owner().getId(), "Sur");

        assertEquals(
                List.of(
                        new SearchProviderProjection(byTradeName.getId(), "Agro Sur"),
                        new SearchProviderProjection(byLegalName.getId(), "Insumos Pampa")),
                result);
    }

    @Test
    void testSiNingunProveedorCoincideConLaBusquedaDevuelveListaVacia() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner1@gmail.com");

        List<SearchProviderProjection> result = providerService.search(tenant.owner().getId(), "Inexistente");

        assertTrue(result.isEmpty());
    }

    @Test
    void testLaBusquedaNoDistingueMayusculasDeMinusculas() {
        TestFixtures.Tenant tenant = fixtures.tenant("Empresa 1", "30-11111111-1", "owner1@gmail.com");
        Provider provider = fixtures.provider(tenant.company().getId(), "Agro Sur", "30-33333333-3");

        List<SearchProviderProjection> result = providerService.search(tenant.owner().getId(), "aGRO sUR");

        assertEquals(List.of(new SearchProviderProjection(provider.getId(), "Agro Sur")), result);
    }
}
