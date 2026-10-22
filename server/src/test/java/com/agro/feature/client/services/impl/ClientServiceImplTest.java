package com.agro.feature.client.services.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.branch.domain.Branch;
import com.agro.feature.branch.persistence.BranchDAO;
import com.agro.feature.client.domain.Client;
import com.agro.feature.client.domain.NaturalPerson;
import com.agro.feature.client.domain.RazonSocial;
import com.agro.feature.client.dtos.ClientType;
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

import java.util.List;

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

    @Autowired
    private CompanyService companyService;

    @Autowired
    private BranchDAO branchDAO;

    @Autowired
    private RegisterOrchestrator orchestrator;

    private Company company;
    private User user;
    private Branch branch;

    private Client naturalPersonClient;
    private Client razonSocialClient;

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

        naturalPersonClient = new NaturalPerson(
                "Nicolás",
                "Bossi",
                "11-11111111-1",
                "1162870692",
                "nicolas@gmail.com",
                "Lavalle 123",
                "Florencio Varela",
                Province.Cordoba
        );

        razonSocialClient = new RazonSocial(
                "Empresa S.A.",
                "Nicolás",
                "Bossi",
                "1162870692",
                "empresa@gmail.com",
                "20-22222222-2",
                "Lavalle 123",
                "Florencio Varela",
                Province.Cordoba
        );
    }

    @Test
    void testSePersisteUnClient() {
        Client addedClient = service.save(naturalPersonClient, user.getId());
        assertNotNull(addedClient.getId());
    }

    @Test
    void testSiSePersisteOtroClienteConMismoCuit_LanzaExcepcion() {
        Client duplicateCuitClient = new NaturalPerson(
                "Nicolás",
                "Bossi",
                "11-11111111-1",
                "1162870692",
                "otro@gmail.com",
                "Lavalle 123",
                "Florencio Varela",
                Province.Cordoba
        );
        service.save(naturalPersonClient, user.getId());
        assertThrows(CuitDuplicatedException.class, () -> service.save(duplicateCuitClient, user.getId()));
    }

    @Test
    void testSeRecuperaUnClientePorSuId() {
        Client addedClient = service.save(naturalPersonClient, user.getId());
        Client findClient = service.findById(addedClient.getId());
        assertEquals(addedClient.getId(), findClient.getId());
    }

    @Test
    void testSiSeBuscaUnClieneNoRegistrado_LanzaExcepcion() {
        assertThrows(EntityNotFoundException.class, () -> service.findById(1L));
    }

    @Test
    public void testSeRecuperaLosClientesPorTipoYNameRazonSocial() {
        Client addedRazonSocial = service.save(razonSocialClient, user.getId());
        Client addedNaturalPerson = service.save(naturalPersonClient, user.getId());

        List<Client> clients = service.findByTypeAndName(ClientType.RAZON_SOCIAL, "Empresa");

        assertNotNull(addedRazonSocial);
        assertNotNull(addedRazonSocial.getId());
        assertFalse(clients.isEmpty());

        boolean isClientInList = clients.stream()
                .anyMatch(c -> c.getId().equals(addedRazonSocial.getId()));
        assertTrue(isClientInList);

        boolean containsNaturalPerson = clients.stream()
                .anyMatch(c -> c instanceof NaturalPerson);
        assertFalse(containsNaturalPerson, "La lista no debe contener clientes de tipo NaturalPerson");
    }

    @Test
    public void testSeRecuperaLosClientesPorTipoYNamePersonaNatural() {
        Client addedNaturalPerson = service.save(naturalPersonClient, user.getId());
        Client addedRazonSocial = service.save(razonSocialClient, user.getId());

        List<Client> clients = service.findByTypeAndName(ClientType.NATURAL_PERSON, "Nicolás");

        assertNotNull(addedNaturalPerson);
        assertNotNull(addedNaturalPerson.getId());
        assertFalse(clients.isEmpty());

        boolean isClientInList = clients.stream()
                .anyMatch(c -> c.getId().equals(addedNaturalPerson.getId()));
        assertTrue(isClientInList);

        boolean containsRazonSocial = clients.stream()
                .anyMatch(c -> c instanceof RazonSocial);
        assertFalse(containsRazonSocial, "La lista no debe contener clientes de tipo RazonSocial");
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}