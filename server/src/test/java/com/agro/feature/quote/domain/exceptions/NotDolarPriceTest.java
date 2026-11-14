package com.agro.feature.quote.domain.exceptions;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NotDolarPriceTest {

    @Test
    void testGetTotalDevuelveElTotalEnDolaresDeLaCotizacionQueNoPudoConvertirse() {
        NotDolarPrice exception = new NotDolarPrice("No se pudo obtener el precio del dolar oficial", new BigDecimal("362"));

        assertEquals(0, new BigDecimal("362").compareTo(exception.getTotal()));
    }
}
