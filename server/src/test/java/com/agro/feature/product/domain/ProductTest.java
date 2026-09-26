package com.agro.feature.product.domain;

import com.agro.feature.product.domain.exceptions.ListPriceException;
import com.agro.feature.product.domain.exceptions.SameProductNameException;
import com.agro.shared.valueObjects.porcent.PorcentException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ProductTest {

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
                10000000d,
                IVA.GENERAL,
                "a",
                20,
                30d
        );
        assertEquals(30d, product.getFreight());
    }

    @Test
    void testUnProductoTieneUnaBonificacion() {
        assertEquals(20, product.getBonification());
    }

    @Test
    void testSiLaBonificacionNoEsMayorACero_LanzaException() {
        assertThrows(PorcentException.class,() -> new Product(
                "ProductSS",
                "product nsnns",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
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
                10000000d,
                IVA.GENERAL,
                "a",
                101,
                30d
        ));
    }

    @Test
    void testUnProductoTieneUnaListaDePrecioDeOchoDigitos() {
        assertEquals(10000000d, product.getListPrice());
    }

    @Test
    void testUnProductoTieneUnaListaDePrecioDeSeisDigitos() {
        Double listPrice = 123456d;
        Product product = new Product(
                "ProductSS",
                "product nsnns",
                Money.ARS,
                listPrice,
                IVA.GENERAL,
                "a",
                20,
                30d
        );
        assertEquals(listPrice, product.getListPrice());
    }

    @Test
    void testUnProductoTieneUnaListaDePrecioDeSeisDigitosConDecimales() {
        Double listPrice = 123456.50;
        Product product = new Product(
                "ProductSS",
                "product nsnns",
                Money.ARS,
                listPrice,
                IVA.GENERAL,
                "a",
                20,
                30d
        );
        assertEquals(listPrice, product.getListPrice());
    }

    @Test
    void testSiLaListaDePreciosSuperaLosOcheDigitos_LanzaExcepcion() {
        assertThrows(ListPriceException.class,() -> new Product(
                "ProductSS",
                "product nsnns",
                Money.ARS,
                100000020d,
                IVA.GENERAL,
                "a",
                100
        ));
    }

    @Test
    void testUnProductoTieneIVA() {
        assertEquals(IVA.GENERAL, product.getIva());
    }

    @Test
    void testUnProductoTieneUnaMoneda() {
        assertEquals(Money.ARS, product.getMoney());
    }

    @Test
    void testUnProductoTieneUnaDescripcion() {
        assertEquals("product nsnns", product.getDescription());
    }

    @Test
    void testInicialmenteUnProductNoTieneTipoDeProductoAsociado() {
        assertEquals("a", product.getProductType());
    }

    @Test
    void testUnProductoAgregaUnOpcional() {
        Optional optional = new Optional(product, "opcional 1", 100D);
        product.addOptional(optional);
        assertEquals(optional.getMoney(), product.getMoney());
    }

    @Test
    void testUnProductoEditaSusValoresExceptoSuNombreYSuTipo() {
        Product product = new Product(
                "ProductSS",
                "product nsnns",
                Money.ARS,
                10000000d,
                IVA.GENERAL,
                "a",
                20
        );
        product.edit(Money.USD, 1025007d, IVA.REDUCIDA, 50, 8D, new ArrayList<Optional>());
        assertEquals(Money.USD, product.getMoney());
        assertEquals(1025007d, product.getListPrice());
        assertEquals(IVA.REDUCIDA, product.getIva());
        assertEquals(50, product.getBonification());
        assertEquals(8D, product.getFreight());
    }

    @Test
    void testSeAgreganNuevosOpcionalesAlEditarUnProducto() {
        List<Optional> toDelete = new ArrayList<>();
        toDelete.add(new Optional(product, "optional 1", 5D));
        toDelete.add(new Optional(product, "optional 2", 3D));
        product.edit(Money.USD, 1025007d, IVA.REDUCIDA, 50, 8D, toDelete);
        assertTrue(product.getOptionals().isEmpty());
    }
}