package com.agro.feature.client.domain;

import com.agro.shared.entities.province.Province;
import com.agro.shared.valueObjects.cuit.CuitFormatException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ClientTest {

    private Client person;

    @BeforeEach
    void setUp() {
        person = new NaturalPerson(
                "Nicolás",
                "Bossi",
                "11-11111111-1",
                "1162870692",
                "n@gmail.com",
                "Lavalle 123",
                "Florencio Varela",
                Province.Cordoba
        );
    }

    @Test
    void testSeObtieneLaInformacionDeUnCliente() {
        assertEquals("Florencio Varela", person.getLocation());
        assertEquals("11-11111111-1", person.getCuit());
        assertEquals("Lavalle 123", person.getAddress());
        assertEquals(Province.Cordoba, person.getProvince());
    }

    @Test
    void testSiSeIngresaUnCuitSinNumero_LanzaExcepcion() {
        assertThrows(CuitFormatException.class, () -> new NaturalPerson(
                "Nicolás",
                "Bossi",
                "a1-11111111-1",
                "1162870692",
                "n@gmail.com",
                "Lavalle 123",
                "Florencio Varela",
                Province.Cordoba
        ));
    }

    @Test
    void testSiSeIngresaUnCuitGuionesMedios_LanzaExcepcion() {
        assertThrows(CuitFormatException.class, () -> new NaturalPerson(
                "Nicolás",
                "Bossi",
                "11111111111",
                "1162870692",
                "n@gmail.com",
                "Lavalle 123",
                "Florencio Varela",
                Province.Cordoba
        ));
    }

    @Test
    void testSiElCuitDifiereDeOnceNumeros_LanzaExcepcion() {
        assertThrows(CuitFormatException.class, () -> new NaturalPerson(
                "Nicolás",
                "Bossi",
                "1111111111133",
                "1162870692",
                "n@gmail.com",
                "Lavalle 123",
                "Florencio Varela",
                Province.Cordoba
        ));
    }
}