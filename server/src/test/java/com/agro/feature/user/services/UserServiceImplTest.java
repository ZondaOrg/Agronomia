package com.agro.feature.user.services;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.branch.domain.Branch;
import com.agro.feature.branch.persistence.BranchDAO;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.service.CompanyService;
import com.agro.feature.image.domain.Imagen;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.orchestrator.RegisterOrchestrator;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.entities.userAuthenticate.UserAuthenticate;
import com.agro.shared.service.ResetService;
import com.agro.shared.valueObjects.email.EmailValue;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
class UserServiceImplTest {
    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired
    private RegisterOrchestrator orchestrator;

    @Autowired
    private BranchDAO  branchDAO;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private ResetService resetService;

    @Autowired
    private UserServiceImpl service;

    private User user;

    private Company company;

    private Branch branch;

    @BeforeEach
    void setUp() {
        branch = branchDAO.save(Branch.builder()
                .city("Berlin")
                .direction("street 123")
                .build());

        Imagen imagen = Imagen.builder()
                .url("https://res.cloudinary.com/dvkvlpq07/image/upload/v1785440325/logo_tfzoil.jpg")
                .publicId("123123")
                .build();

        company = companyService.save(Company.builder()
                .cuit("12312312")
                .logo(imagen)
                .name("12312312")
                .legalName("12312312")
                .build());

        user = User.builder()
                .name("12312312")
                .email(new EmailValue("n2n@gmail.com"))
                .role(Role.DUENIO)
                .build();

        user = orchestrator.register(user, company.getId(), branch.getId());
    }

    @Test
    void testSeBuscaLasCredencialesDeUnUsuarioPorSuMail() {
        UserAuthenticate addedUser = service.getCredentialsByEmail(user.getEmail());
        assertEquals(user.getEmail(), addedUser.email());
        assertEquals(user.getId(), addedUser.id());
        assertEquals(user.getRole(), addedUser.role());
    }

    @Test
    void testFindAllFiltraPorEmpresaDelAdmin() {
        User colega = User.builder()
                .name("Colega Misma Empresa")
                .email(new EmailValue("colega@gmail.com"))
                .role(Role.VENDEDOR)
                .build();
        orchestrator.register(colega, company.getId(), branch.getId());

        Imagen imagen = Imagen.builder()
                .url("otro-logo")
                .publicId("123123")
                .build();

        Company otraCompany = companyService.save(Company.builder()
                .cuit("99999999")
                .logo(imagen)
                .name("Otra Empresa")
                .legalName("Otra Empresa SA")
                .build());

        User usuarioOtraEmpresa = User.builder()
                .name("Usuario Otra Empresa")
                .email(new EmailValue("otro@gmail.com"))
                .role(Role.VENDEDOR)
                .build();
        orchestrator.register(usuarioOtraEmpresa, otraCompany.getId(),  branch.getId());

        Page<User> result = service.findAll(0, 10, user.getId());

        assertEquals(2, result.getTotalElements());
        assertTrue(result.getContent().stream()
                .allMatch(u -> u.getCompany().getId() == company.getId()));
    }

    @Test
    void testFindAllRespetaLaPaginacion() {
        for (int i = 0; i < 5; i++) {
            User u = User.builder()
                    .name("User " + i)
                    .email(new EmailValue("user" + i + "@gmail.com"))
                    .role(Role.VENDEDOR)
                    .build();
            orchestrator.register(u, company.getId(),  branch.getId());
        }
        Page<User> firstPage = service.findAll(0, 3, user.getId());

        assertEquals(3, firstPage.getContent().size());
        assertEquals(6, firstPage.getTotalElements());
        assertEquals(2, firstPage.getTotalPages());
    }

    @Test
    void testFindAllNoDevuelveUsuariosDeOtraEmpresa() {
        Imagen imagen = Imagen.builder()
                .url("logo-x")
                .publicId("123123")
                .build();

        Company otraCompany = companyService.save(Company.builder()
                .cuit("55555555")
                .logo(imagen)
                .name("Empresa X")
                .legalName("Empresa X SA")
                .build());

        User usuarioOtraEmpresa = User.builder()
                .name("Ajeno")
                .email(new EmailValue("ajeno@gmail.com"))
                .role(Role.VENDEDOR)
                .build();
        orchestrator.register(usuarioOtraEmpresa, otraCompany.getId(),  branch.getId());

        Page<User> result = service.findAll(0, 10, user.getId());

        assertTrue(result.getContent().stream()
                .noneMatch(u -> u.getEmail().equals("ajeno@gmail.com")));
    }

    @Test
    void testSeRecuperaUnUsuarioPorSuId() {
        User found = service.getUserById(user.getId());
        assertEquals(user.getId(), found.getId());
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}