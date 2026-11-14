package com.agro.feature.quote.services.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.core.config.CacheConfig;
import com.agro.feature.quote.domain.Quote;
import com.agro.feature.quote.domain.exceptions.NotDolarPrice;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
@Import(DolarPriceServiceImplExternalFailureTest.MockDolarApiConfig.class)
class DolarPriceServiceImplExternalFailureTest {

    @TestConfiguration
    static class MockDolarApiConfig {

        private final RestClient.Builder builder = RestClient.builder().baseUrl("https://dolarapi.com/v1");
        private final MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();

        @Bean
        MockRestServiceServer dolarApiServer() {
            return server;
        }

        @Bean
        @Primary
        RestClient mockedDolarApi() {
            return builder.build();
        }
    }

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired private DolarPriceServiceImpl service;
    @Autowired private MockRestServiceServer server;
    @Autowired private CacheManager cacheManager;

    @Test
    void testSiElServicioExternoRespondeErrorDelServidorLanzaNotDolarPriceConElTotalEnDolares() {
        server.expect(requestTo("https://dolarapi.com/v1/dolares/oficial"))
                .andRespond(withStatus(HttpStatus.INTERNAL_SERVER_ERROR));
        Quote quote = new Quote(new BigDecimal("1000"), new BigDecimal("0.21"), BigDecimal.ZERO, List.of(), 1);

        NotDolarPrice exception = assertThrows(NotDolarPrice.class, () -> service.get(quote));

        assertEquals(0, new BigDecimal("1210").compareTo(exception.getTotal()));
    }

    @Test
    void testSiElServicioExternoRespondeErrorDelClienteLanzaNotDolarPriceConElTotalEnDolares() {
        server.expect(requestTo("https://dolarapi.com/v1/dolares/oficial"))
                .andRespond(withStatus(HttpStatus.NOT_FOUND));
        Quote quote = new Quote(new BigDecimal("1000"), new BigDecimal("0.21"), BigDecimal.ZERO, List.of(), 1);

        NotDolarPrice exception = assertThrows(NotDolarPrice.class, () -> service.get(quote));

        assertEquals(0, new BigDecimal("1210").compareTo(exception.getTotal()));
    }

    @Test
    void testSiFallaLaConexionConElServicioExternoLanzaNotDolarPriceConElTotalEnDolares() {
        server.expect(requestTo("https://dolarapi.com/v1/dolares/oficial"))
                .andRespond(request -> {
                    throw new IOException("Connection refused");
                });
        Quote quote = new Quote(new BigDecimal("1000"), new BigDecimal("0.21"), BigDecimal.ZERO, List.of(), 1);

        NotDolarPrice exception = assertThrows(NotDolarPrice.class, () -> service.get(quote));

        assertEquals(0, new BigDecimal("1210").compareTo(exception.getTotal()));
    }

    @AfterEach
    void tearDown() {
        server.reset();
        cacheManager.getCache(CacheConfig.DOLAR_OFICIAL).clear();
    }
}
