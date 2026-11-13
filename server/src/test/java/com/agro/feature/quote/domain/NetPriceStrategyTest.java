package com.agro.feature.quote.domain;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NetPriceStrategyTest {

    @Test
    void testConvertDevuelveElMismoTotalEnDolaresSinConversion() {
        TotalStrategy strategy = new NetPriceStrategy();

        assertEquals(0, new BigDecimal("361.50").compareTo(strategy.convert(new BigDecimal("361.50"))));
    }
}
