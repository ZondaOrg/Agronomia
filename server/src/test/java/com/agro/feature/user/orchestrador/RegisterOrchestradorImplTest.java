package com.agro.feature.user.orchestrador;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.branch.domain.Branch;
import com.agro.feature.branch.persistence.BranchDAO;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.service.CompanyService;
import com.agro.feature.image.domain.Imagen;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.domain.exceptions.EmailDuplicatedException;
import com.agro.feature.user.orchestrator.RegisterOrchestrator;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.service.ResetService;
import com.agro.shared.valueObjects.email.EmailValue;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
public class RegisterOrchestradorImplTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired
    private RegisterOrchestrator orchestrator;

    @Autowired
    private BranchDAO branchDAO;


    @Autowired
    private CompanyService companyService;

    @Autowired
    private ResetService resetService;

    private User user;

    private Company company;

    private Branch branch;

    @BeforeEach
    public void setUp() {
        branch = branchDAO.save(Branch.builder()
                .city("Berlin")
                .direction("street 123")
                .build());

        Imagen imagen = Imagen.builder()
                .url("otro-logo")
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
    }

    @Test
    public void testRegisterUser() {
        User saved = orchestrator.register(user, company.getId(), branch.getId());

        companyService.getCompanyById(company.getId());

        assertEquals(company.getId(), saved.getCompany().getId());
        assertEquals(user.getName(), saved.getName());
        assertEquals(user.getEmail(), saved.getEmail());
        assertEquals(user.getPassword(), saved.getPassword());
    }

    @Test
    public void testRegisterFailedEmailDuplicated(){
        orchestrator.register(user, company.getId(), branch.getId());
        User userMailDuplicated = User.builder()
                .name("12312312")
                .email(new EmailValue("n2n@gmail.com"))
                .role(Role.DUENIO)
                .build();

        assertThrows(EmailDuplicatedException.class,() -> orchestrator.register(userMailDuplicated,company.getId(), branch.getId()));
    }

    @AfterEach
    public void tearDown() {
        resetService.resetAll();
    }
}
