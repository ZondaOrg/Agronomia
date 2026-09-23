package com.agro.feature.product.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class OptionalTest {

    private Optional optional;

    private Product product;

    @BeforeEach
    void setUp() {
        product = new Product(
                "ProductSS",
                "product nsnns",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
                20
        );
        optional = new Optional(product, "opcional 1", 100D);
    }

    @Test
    void testUnOpcionalTieneUnNombre() {
        assertEquals("opcional 1", optional.getName());
    }

    @Test
    void testUnOpcionalTieneUnPrecio() {
        assertEquals(100D, optional.getPrice());
    }

    @Test
    void testUnOpcionalTieneUnaMoneda() {
        assertEquals(Money.ARS, optional.getMoney());
    }

    @Test
    void testUnOpcionalTieneLaMismaMonedaQueSuProducto() {
        assertEquals(product.getMoney(), optional.getMoney());
    }
}