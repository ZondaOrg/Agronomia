package com.agro.feature.provider.contracts;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.branch.domain.Branch;
import com.agro.feature.branch.persistence.BranchDAO;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.service.CompanyService;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.domain.Traveler;
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
import org.springframework.data.domain.Page;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
class ProviderDataServiceTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();


    @Autowired
    private ProviderDataService  providerDataService;


    @Autowired
    private CompanyService companyService;

    @Autowired
    private BranchDAO branchDAO;

    @Autowired
    private RegisterOrchestrator orchestrator;

    @Autowired
    private ResetService resetService;

    private Company company;

    private User user;

    private User userOtherCompany;

    private Branch branch;

    private Provider provider;

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



        Company otherCompany = companyService.save(Company.builder()
                .cuit("00000000")
                .name("Otra Empresa")
                .legalName("Otra Empresa SA")
                .build());

        User newUser = User.builder()
                .name("Tomas")
                .email(new EmailValue("n2n@gmail.com"))
                .role(Role.DUENIO)
                .build();

        User newUser2 = User.builder()
                .name("Tomas")
                .email(new EmailValue("n2123123n@gmail.com"))
                .role(Role.DUENIO)
                .build();

        user = orchestrator.register(newUser, company.getId(), branch.getId());

        userOtherCompany = orchestrator.register(newUser2, otherCompany.getId(), branch.getId());

        provider = providerDataService.addProvider(userOtherCompany.getId(),Provider.builder()
                .tradeName("ww")
                .legalName("www")
                .cuit("30-98621321-0")
                .phoneNumber("11-4444-5555")
                .companyId(company.getId())
                .listPrices(new ArrayList<>(List.of(1500, 2300)))
                .build());

    }

    @Test
    public void getProviders_returnsOnlyProvidersFromUserCompany() {
        providerDataService.addProvider(user.getId(),Provider.builder()
                .tradeName("Agroinsumos del Sur")
                .legalName("Agroinsumos del Sur S.R.L.")
                .cuit("30-87654321-0")
                .phoneNumber("11-4444-5555")
                .companyId(company.getId())
                .listPrices(new ArrayList<>(List.of(1500, 2300)))
                .build());

        providerDataService.addProvider(user.getId(),Provider.builder()
                .tradeName("Insumos Pampa")
                .legalName("Insumos Pampa S.A.")
                .cuit("30-11223344-5")
                .phoneNumber("11-9999-8888")
                .companyId(company.getId())
                .listPrices(new ArrayList<>(List.of(800, 950)))
                .build());


        providerDataService.addProvider(userOtherCompany.getId(),Provider.builder()
                .tradeName("Proveedor Ajeno")
                .legalName("Proveedor Ajeno S.A.")
                .cuit("30-00000000-0")
                .phoneNumber("11-0000-0000")
                .listPrices(new ArrayList<>())
                .build());

        Page<Provider> result = providerDataService.getProviders(0, 10, user.getId(), "");

        assertEquals(2, result.getTotalElements());
        assertTrue(result.getContent().stream()
                .allMatch(provider -> provider.getCompanyId().equals(company.getId())));
    }

    @Test
    public void getProviders_filtersByTradeNameOrLegalName() {
        providerDataService.addProvider(user.getId(), Provider.builder()
                .tradeName("Agroinsumos del Sur")
                .legalName("Agroinsumos del Sur S.R.L.")
                .cuit("30-87654321-0")
                .phoneNumber("11-4444-5555")
                .companyId(company.getId())
                .listPrices(new ArrayList<>())
                .build());

        providerDataService.addProvider(user.getId(),Provider.builder()
                .tradeName("Insumos Pampa")
                .legalName("Insumos Pampa S.A.")
                .cuit("30-11223344-5")
                .phoneNumber("11-9999-8888")
                .companyId(company.getId())
                .listPrices(new ArrayList<>())
                .build());

        Page<Provider> result = providerDataService.getProviders(0, 10, user.getId(), "Pampa");

        assertEquals(1, result.getTotalElements());
        assertEquals("Insumos Pampa", result.getContent().get(0).getTradeName());
    }

    @Test
    public void getProviders_returnsEmptyPage_whenCompanyHasNoProviders() {
        Page<Provider> result = providerDataService.getProviders(0, 10, user.getId(), "");

        assertTrue(result.getContent().isEmpty());
        assertEquals(0, result.getTotalElements());
    }

    @Test
    public void editProvider(){
        Provider editProvider = new Provider("541162707458", new Traveler(null, "Robert", "541162707458"));

        editProvider.setId(provider.getId());

        providerDataService.editProvider(userOtherCompany.getId(), editProvider);

        Provider recovered = providerDataService.getProviderById(provider.getId());

        assertEquals(editProvider.getPhoneNumber(), recovered.getPhoneNumber());
        assertEquals(editProvider.getTraveler().getFullName(), recovered.getTraveler().getFullName());
        assertEquals(editProvider.getTraveler().getPhoneNumber(), recovered.getTraveler().getPhoneNumber());
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}