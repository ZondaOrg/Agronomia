package com.agro.feature.quote.domain;

import com.agro.feature.quote.domain.exceptions.NegativeAmountException;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class UsdToArsStrategyTest {

    @Test
    void testUnDolarIgualACeroLanzaNegativeAmountException() {
        assertThrows(NegativeAmountException.class, () -> new UsdToArsStrategy(BigDecimal.ZERO));
    }

    @Test
    void testUnDolarNegativoLanzaNegativeAmountException() {
        assertThrows(NegativeAmountException.class, () -> new UsdToArsStrategy(new BigDecimal("-1")));
    }

    @Test
    void testConvertMultiplicaElTotalEnDolaresPorElDolarSinRedondear() {
        TotalStrategy strategy = new UsdToArsStrategy(new BigDecimal("1000"));

        assertEquals(0, new BigDecimal("108010").compareTo(strategy.convert(new BigDecimal("108.01"))));
    }
}
