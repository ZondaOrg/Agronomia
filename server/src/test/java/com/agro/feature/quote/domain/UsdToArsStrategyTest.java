package com.agro.feature.quote.domain;

import com.agro.feature.quote.domain.exceptions.NegativeAmountException;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertThrows;

class UsdToArsStrategyTest {

    @Test
    void testUnDolarIgualACeroLanzaNegativeAmountException() {
        assertThrows(NegativeAmountException.class, () -> new UsdToArsStrategy(BigDecimal.ZERO));
    }
}
