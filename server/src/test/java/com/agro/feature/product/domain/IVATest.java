package com.agro.feature.product.domain;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

class IVATest {

    @Test
    void testLaFraccionDelIvaGeneralEs021() {
        assertEquals(0, new BigDecimal("0.21").compareTo(IVA.GENERAL.rate()));
    }

    @Test
    void testLaFraccionDelIvaReducidaEs0105() {
        assertEquals(0, new BigDecimal("0.105").compareTo(IVA.REDUCIDA.rate()));
    }
}
