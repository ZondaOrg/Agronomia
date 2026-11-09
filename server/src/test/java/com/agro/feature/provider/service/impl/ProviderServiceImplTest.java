package com.agro.feature.provider.service.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.core.TestFixtures;
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

import static org.junit.jupiter.api.Assertions.assertThrows;

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
}
