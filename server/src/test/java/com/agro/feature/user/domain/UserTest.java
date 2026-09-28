package com.agro.feature.user.domain;

import com.agro.shared.entities.rol.Role;
import com.agro.shared.valueObjects.email.EmailException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class UserTest {

    private User user;

    @BeforeEach
    void setUp() {
        user = new User("Nicolás Fernando ", Role.DUENIO, "Bossi", "n@gmail.com", "aa");
    }

    @Test
    void testUnUsuarioTieneUnMail() {
        assertEquals(user.getEmail(), "n@gmail.com");
    }

    @Test
    void testSiElMailNoTieneArroba_HayExcepcion() {
        assertThrows(
                EmailException.class,
                () -> new User("Nicolás Fernando", Role.DUENIO, "Bossi", "n_gmail.com", "aa"));
    }

    @Test
    void testUnUsuarioTieneUnRol() {
        assertEquals(user.getRole(), Role.DUENIO);
    }
}