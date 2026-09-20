package com.agro.feature.product.domain;

import com.agro.feature.product.domain.exceptions.SameProductNameException;
import com.agro.shared.valueObjects.porcent.PorcentException;
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

    @Test
    void testSiElProductoNoIncluyeFlete_EsCero() {
        assertEquals(0, product.getFreight());
    }

    @Test
    void testSiElProductoIncluyeFlete_NoEsCero() {
        Product product = new Product(
                "ProductSS",
                "product nsnns",
                Money.ARS,
                10d,
                IVA.GENERAL,
                20,
                30d
        );
        assertEquals(30d, product.getFreight());
    }

    @Test
    void testSiLaBonificacionNoEsMayorACero_LanzaException() {
        assertThrows(PorcentException.class,() -> new Product(
                "ProductSS",
                "product nsnns",
                Money.ARS,
                10d,
                IVA.GENERAL,
                0,
                30d
        ));
    }

    @Test
    void testSiLaBonificacionEsMayorACien_LanzaException() {
        assertThrows(PorcentException.class,() -> new Product(
                "ProductSS",
                "product nsnns",
                Money.ARS,
                10d,
                IVA.GENERAL,
                101,
                30d
        ));
    }

}