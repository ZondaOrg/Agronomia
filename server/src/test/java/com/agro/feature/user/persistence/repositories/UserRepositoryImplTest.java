package com.agro.feature.user.persistence.repositories;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.persistence.daos.UserDAO;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.persistence.excepitons.NotFoundEntityException;
import com.agro.shared.service.ResetService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("test")
@Testcontainers
class UserRepositoryImplTest {

    @Container
    private static PostgreSQLContainer container = ContainerPostgresql.getContainer();;

    @Autowired
    private UserDAO userDao;

    @Autowired
    private ResetService  resetService;

    @Autowired
    private UserRepositoryImpl repository;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User("Nicolás Fernando", Role.FACTURACION,"Bossi", "n@gmail.com", "aa");
    }

    @Test
    void testSeRecuperaUnUsuarioPorSuEmail() {
        repository.save(user);
        User addedUser = repository.findByEmail(user.getEmail());
        assertNotNull(addedUser.getId());
    }

    @Test
    void testSiElMailNoEstaRegistrado_LanzaExepcion() {
        assertThrows(NotFoundEntityException.class, () -> repository.findByEmail(user.getEmail()));
    }

    @AfterEach
    public void tearDown() {
        resetService.resetAll();
    }
}