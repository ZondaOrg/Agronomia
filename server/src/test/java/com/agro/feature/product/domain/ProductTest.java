package com.agro.feature.product.domain;

import com.agro.feature.product.domain.exceptions.SameProductNameException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProductTest {

    private Product product;

    @BeforeEach
    void setUp() {
        product = new Product(
                "ProductSS",
                "product nsnns",
                Money.ARS,
                10d,
                IVA.GENERAL,
                20
        );
    }

    @Test
    void testUnProductTieneUnNombre() {
        assertEquals("ProductSS", product.getName());
    }

    @Test
    void testSiHayDosProductosConElMismoNombre_LanzaExcepcion() {
        assertThrows(SameProductNameException.class,() -> product.validateName("ProductSS"));
    }

    @Test
    void testSiHayDosProductosConElMismoNombre_NoSeDistingueFormatoYSeLanzaExcepcion() {
        assertThrows(SameProductNameException.class,() -> product.validateName("productss"));
        assertThrows(SameProductNameException.class,() -> product.validateName("p rodu ctss "));
        assertThrows(SameProductNameException.class,() -> product.validateName("PróductSS"));
    }

}