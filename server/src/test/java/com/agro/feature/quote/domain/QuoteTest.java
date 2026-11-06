package com.agro.feature.quote.domain;

import com.agro.feature.quote.domain.exceptions.InvalidQuantityException;
import com.agro.feature.quote.domain.exceptions.NegativeAmountException;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class QuoteTest {

    @Test
    void testUnPrecioDeListaNegativoLanzaNegativeAmountException() {
        assertThrows(NegativeAmountException.class,
                () -> new Quote(new BigDecimal("-1"), new BigDecimal("0.21"), BigDecimal.ZERO, List.of(), 1));
    }

    @Test
    void testUnIvaNegativoLanzaNegativeAmountException() {
        assertThrows(NegativeAmountException.class,
                () -> new Quote(new BigDecimal("1000"), new BigDecimal("-0.21"), BigDecimal.ZERO, List.of(), 1));
    }

    @Test
    void testUnFleteNegativoLanzaNegativeAmountException() {
        assertThrows(NegativeAmountException.class,
                () -> new Quote(new BigDecimal("1000"), new BigDecimal("0.21"), new BigDecimal("-100"), List.of(), 1));
    }

    @Test
    void testUnPrecioDeOpcionalNegativoLanzaNegativeAmountException() {
        assertThrows(NegativeAmountException.class,
                () -> new Quote(new BigDecimal("1000"), new BigDecimal("0.21"), BigDecimal.ZERO,
                        List.of(new BigDecimal("50"), new BigDecimal("-1")), 1));
    }

    @Test
    void testUnaCantidadMenorQueUnoLanzaInvalidQuantityException() {
        assertThrows(InvalidQuantityException.class,
                () -> new Quote(new BigDecimal("1000"), new BigDecimal("0.21"), BigDecimal.ZERO, List.of(), 0));
    }

    @Test
    void testElTotalSinOpcionalesNiFleteEsElPrecioDeListaConIva() {
        Quote quote = new Quote(new BigDecimal("1000"), new BigDecimal("0.21"), BigDecimal.ZERO, List.of(), 1);

        assertEquals(0, new BigDecimal("1210").compareTo(quote.getTotal()));
    }

    @Test
    void testElTotalSumaLosOpcionalesAntesDeAplicarIva() {
        // (1000 + 100 + 50) * 1.21 = 1391.5
        Quote quote = new Quote(new BigDecimal("1000"), new BigDecimal("0.21"), BigDecimal.ZERO,
                List.of(new BigDecimal("100"), new BigDecimal("50")), 1);

        assertEquals(0, new BigDecimal("1391.5").compareTo(quote.getTotal()));
    }
}
