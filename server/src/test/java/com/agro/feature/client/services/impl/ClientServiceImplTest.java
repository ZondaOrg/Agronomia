package com.agro.feature.client.services.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.branch.domain.Branch;
import com.agro.feature.branch.persistence.BranchDAO;
import com.agro.feature.client.domain.Client;
import com.agro.feature.client.domain.NaturalPerson;
import com.agro.feature.client.persistence.daos.ClientDAO;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.service.CompanyService;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.orchestrator.RegisterOrchestrator;
import com.agro.shared.entities.province.Province;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.service.ResetService;
import com.agro.shared.valueObjects.cuit.CuitDuplicatedException;
import com.agro.shared.valueObjects.email.EmailValue;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
class ClientServiceImplTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired
    private ClientServiceImpl service;

    @Autowired
    private ClientDAO dao;

    @Autowired
    private ResetService resetService;

    private Client client;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private BranchDAO branchDAO;

    @Autowired
    private RegisterOrchestrator orchestrator;

    private Company company;

    private User user;

    private Branch branch;

    @BeforeEach
    void setup() {
        branch = branchDAO.save(Branch.builder()
                .city("Berlin")
                .direction("street 123")
                .build());

        company = companyService.save(Company.builder()
                .cuit("12312312")
                .name("Matilda")
                .legalName("Matilda SA")
                .build());

        User newUser = User.builder()
                .name("Tomas")
                .email(new EmailValue("n2n@gmail.com"))
                .role(Role.DUENIO)
                .build();

        user = orchestrator.register(newUser, company.getId(), branch.getId());
    }

    @BeforeEach
    void setUp() {
        client = new NaturalPerson(
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
    void testSePersisteUnClient() {
        Client addedClient = service.save(client, user.getId());
        assertNotNull(addedClient.getId());
    }

    @Test
    void testSiSePersisteOtroClienteConMismoCuit_LanzaExcepcion() {
        Client client1 = new NaturalPerson(
                "Nicolás",
                "Bossi",
                "11-11111111-1",
                "1162870692",
                "n@gmail.com",
                "Lavalle 123",
                "Florencio Varela",
                Province.Cordoba
        );
        service.save(client, user.getId());
        assertThrows(CuitDuplicatedException.class, () -> service.save(client1, user.getId()));
    }

    @Test
    void testSeRecuperaUnClientePorSuId() {
        Client addedClient = service.save(client, user.getId());
        Client findClient = service.findById(addedClient.getId());
        assertEquals(addedClient.getId(), findClient.getId());
    }

    @Test
    void testSiSeBuscaUnClieneNoRegistrado_LanzaExcepcion() {
        assertThrows(EntityNotFoundException.class, () -> service.findById(1L));
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}