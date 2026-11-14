package com.agro.feature.quote.services.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.core.config.CacheConfig;
import com.agro.feature.quote.client.DolarPriceClient;
import com.agro.feature.quote.domain.Quote;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.CacheManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
class DolarPriceServiceImplTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private DolarPriceServiceImpl service;
    @Autowired private CacheManager cacheManager;
    @MockitoBean private DolarPriceClient client;

    @Test
    void testSiElDolarEstaEnLaCacheLoDevuelveSinConsultarElServicioExternoAunqueLaCotizacionSeaOtra() {
        when(client.getDolar(any())).thenReturn(new BigDecimal("1000"));
        Quote first = new Quote(new BigDecimal("1000"), new BigDecimal("0.21"), BigDecimal.ZERO, List.of(), 1);
        Quote second = new Quote(new BigDecimal("2000"), new BigDecimal("0.21"), BigDecimal.ZERO, List.of(), 2);

        service.get(first);
        BigDecimal dolar = service.get(second);

        assertEquals(0, new BigDecimal("1000").compareTo(dolar));
        assertNotNull(cacheManager.getCache(CacheConfig.DOLAR_OFICIAL).get("oficial"));
        verify(client, times(1)).getDolar(any());
    }

    @AfterEach
    void tearDown() {
        cacheManager.getCache(CacheConfig.DOLAR_OFICIAL).clear();
    }
}
