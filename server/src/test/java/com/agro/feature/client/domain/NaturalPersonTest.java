package com.agro.feature.client.domain;

import com.agro.shared.entities.province.Province;
import com.agro.shared.valueObjects.email.EmailException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class NaturalPersonTest {

    private NaturalPerson person;

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
    void testSeObtieneLaInformacionDeUnaPersonaNatural() {
        assertEquals("Nicolás", person.getName());
        assertEquals("Bossi", person.getSurname());
        assertEquals("1162870692", person.getPhone());
        assertEquals("n@gmail.com", person.getEmail());
    }

    @Test
    void testSiSeEnviaUnEmailInvalido_LanzaExcepcion() {
        assertThrows(EmailException.class, () -> new NaturalPerson(
                "Nicolás",
                "Bossi",
                "11-11111111-1",
                "1162870692",
                "ns",
                "Lavalle 123",
                "Florencio Varela",
                Province.Cordoba
        ));
    }
}