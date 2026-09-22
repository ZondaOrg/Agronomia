package com.agro.feature.company.service.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.branch.domain.Branch;
import com.agro.feature.branch.persistence.BranchDAO;
import com.agro.feature.company.contracts.CompanyDataService;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.domain.exceptions.IsNotAOwnerOfCompany;
import com.agro.feature.company.service.CompanyService;
import com.agro.feature.image.domain.Imagen;
import com.agro.feature.user.domain.User;
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
class CompanyServiceImplTest {
    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired
    private CompanyService companyService;

    @Autowired
    private BranchDAO branchDAO;

    @Autowired
    private CompanyDataService  companyDataService;

    @Autowired
    private RegisterOrchestrator orchestrator;

    @Autowired
    private ResetService resetService;

    public Company company;

    private User user;

    private Branch branch;

    private Imagen imagen;

    @BeforeEach
    void setup(){
        branch = branchDAO.save(Branch.builder()
                .city("Berlin")
                .direction("street 123")
                .build());

        imagen = Imagen.builder()
                .url("img.jpg")
                .publicId("123123")
                .build();

        company = companyService.save(Company.builder()
                .cuit("12312312")
                .logo(imagen)
                .name("Matilda")
                .legalName("Matilda SA")
                .build());
        user = User.builder()
                .name("12312312")
                .email(new EmailValue("n2n@gmail.com"))
                .role(Role.DUENIO)
                .build();
    }

    @Test
    public void getCompanyByUserId(){
        User saved = orchestrator.register(user, company.getId(),  branch.getId());

        Company recovered = companyDataService.getCompanyByUserId(saved.getId());

        assertEquals(imagen, recovered.getLogo());
        assertEquals("Matilda", recovered.getName());
        assertEquals("12312312", recovered.getCuit());
        assertEquals("Matilda SA", recovered.getLegalName());
        assertEquals(company.getId(), recovered.getId());
    }

    @Test
    public void editCompany_whenAdminBelongsToCompany_updatesCompany(){
        User saved = orchestrator.register(user, company.getId(),  branch.getId());


        Imagen imagen = Imagen.builder()
                .url("newLogo.jpg")
                .publicId("123123")
                .build();

        Company model = Company.builder()
                .cuit("99999999")
                .logo(imagen)
                .name("Matilda Renovada")
                .legalName("Matilda Renovada SA")
                .build();

        Company updated = companyDataService.editCompany(saved.getId(), model, company.getId());

        assertEquals("99999999", updated.getCuit());
        assertEquals("newLogo.jpg", updated.getLogo().getUrl());
        assertEquals("Matilda Renovada", updated.getName());
        assertEquals("Matilda Renovada SA", updated.getLegalName());
        assertEquals(company.getId(), updated.getId());
    }

    @Test
    public void editCompany_whenAdminDoesNotBelongToCompany_throwsException(){
        Imagen imagen = Imagen.builder()
                .url("other.jpg")
                .publicId("123123")
                .build();

        Company otherCompany = companyService.save(Company.builder()
                .cuit("00000000")
                .logo(imagen)
                .name("Otra Empresa")
                .legalName("Otra Empresa SA")
                .build());

        User saved = orchestrator.register(user, company.getId(),  branch.getId());

        Imagen imagen2 = Imagen.builder()
                .url("newLogo.jpg")
                .publicId("123123")
                .build();

        Company model = Company.builder()
                .cuit("99999999")
                .logo(imagen)
                .name("Intento Ajeno")
                .legalName("Intento Ajeno SA")
                .build();

        assertThrows(IsNotAOwnerOfCompany.class, () ->
                companyDataService.editCompany(saved.getId(), model, otherCompany.getId())
        );
    }


    @AfterEach
    public void tearDown(){
        resetService.resetAll();
    }
}