package com.agro.feature.productType.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProductTypeTest {

    private ProductType productType;

    @BeforeEach
    void setUp() {
        productType = new ProductType("Tractorcito");
    }

    @Test
    void testUnTipoDeProductoTieneUnNombre() {
        assertEquals("Tractorcito", productType.getName());
    }
}