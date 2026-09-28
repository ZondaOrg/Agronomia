package com.agro.core.data.impl;

import com.agro.feature.branch.domain.Branch;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.persistence.daos.CompanyDAO;
import com.agro.feature.image.domain.Imagen;
import com.agro.feature.payment.domain.Application;
import com.agro.feature.payment.domain.Payment;
import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.payment.service.VigentesPaymentService;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.domain.Traveler;
import com.agro.feature.provider.persistence.ProviderDAO;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.persistence.daos.UserDAO;
import com.agro.feature.user.services.UserService;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.valueObjects.email.EmailValue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@Profile("seed")
public class ProductionDataSeeder implements CommandLineRunner {

    @Value("${EMAIL_OWNER}")
    private String OWNER_EMAIL;
    private static final String COMPANY_CUIT = "30-12345678-9";

    private final CompanyDAO companyDAO;
    private final UserDAO userDAO;
    private final UserService userService;
    private final ProviderDAO providerDAO;
    private final VigentesPaymentService vigentesPaymentService;

    public ProductionDataSeeder(
            CompanyDAO companyDAO,
            UserDAO userDAO,
            UserService userService,
            ProviderDAO providerDAO,
            VigentesPaymentService vigentesPaymentService
    ) {
        this.companyDAO = companyDAO;
        this.userDAO = userDAO;
        this.userService = userService;
        this.providerDAO = providerDAO;
        this.vigentesPaymentService = vigentesPaymentService;
    }

    @Override
    @Transactional
    public void run(String... args) {
        Company company = companyDAO.findFirstByCuit(COMPANY_CUIT)
                .orElseGet(this::createCompany);

        if (!userDAO.existsByEmail(new EmailValue(OWNER_EMAIL))) {
            createOwner(company);
        }

        seedProviders(company.getId());
    }

    private Company createCompany() {
        Branch mainBranch = Branch.builder()
                .city("Berlin")
                .direction("street 123")
                .build();

        Company company = Company.builder()
                .name("AgroTech")
                .legalName("AgroTech S.A.")
                .cuit(COMPANY_CUIT)
                .logo(Imagen.builder()
                        .url("https://res.cloudinary.com/dvkvlpq07/image/upload/v1785440325/logo_tfzoil.jpg")
                        .publicId("123123")
                        .build())
                .build();

        company.addBranches(List.of(mainBranch));
        return companyDAO.save(company);
    }

    private void createOwner(Company company) {
        User owner = User.builder()
                .name("Tomas")
                .surname("Mendoza")
                .email(new EmailValue(OWNER_EMAIL))
                .branch(company.getBranches().get(0))
                .role(Role.DUENIO)
                .password("123")
                .build();

        company.addUser(owner);
        userService.save(owner);
    }

    private void seedProviders(Long companyId) {
        saveIfMissing(provider("Agroinsumos del Sur", "Agroinsumos del Sur S.R.L.", "30-87654321-0", "11-4444-5555", companyId,
                traveler("Carlos Gomez", "11-2233-4455"), List.of(1500, 2300, 3100)));
        saveIfMissing(provider("Insumos Pampa", "Insumos Pampa S.A.", "30-11223344-5", "11-9999-8888", companyId,
                traveler("Carlos Gomez", "11-5566-7788"), List.of(800, 950)));
        saveIfMissing(provider("Insumos Pampa 2", "Insumos Pampa S.A. 2", "30-11223344-6", "11-9999-8888", companyId,
                null, List.of(800, 950)));
        saveIfMissing(provider("Claas Argentina", "Claas Argentina S.A.", "30-70928156-3", "+54 3492 44-0600", companyId,
                traveler("Federico Alvarez", "+54 9 3492 51-2290"), List.of(4200, 5100, 6300, 7000)));
        saveIfMissing(provider("Agrometal", "Agrometal S.A.I.C.", "30-54892371-6", "351-4567-890", companyId,
                traveler("Lucia Fernandez", "351-6789-012"), List.of(2100, 2900)));
        saveIfMissing(provider("Pauny", "Pauny Sociedad Anonima", "30-70839658-4", "358-465-1122", companyId,
                null, List.of()));
        saveIfMissing(provider("Vassalli Fabril", "Vassalli Fabril S.A.", "30-53821046-9", "341-762-3344", companyId,
                traveler("Martin Suarez", "341-889-5566"), List.of(1800, 2400, 3000)));
        saveIfMissing(provider("Metalfor", "Metalfor S.A.", "30-61234789-2", "358-421-7788", companyId,
                null, List.of()));
        saveIfMissing(provider("Apache Semillas", "Apache Semillas S.A.", "30-68974512-1", "341-556-9900", companyId,
                traveler("Sofia Ramirez", "341-334-1122"), List.of(950, 1300, 1750, 2200)));
        saveIfMissing(provider("Don Mario Semillas", "Don Mario Semillas S.A.", "30-59873421-8", "3401-445-6677", companyId,
                null, List.of()));
    }

    private void saveIfMissing(Provider provider) {
        if (!providerDAO.existsByCuit_Cuit(provider.getCuit())) {
            Provider savedProvider = providerDAO.save(provider);

            VigentePayment vigentePayment = VigentePayment.builder()
                    .nameList("julio 2026")
                    .provider(savedProvider)
                    .payments(new ArrayList<>())
                    .build();

            Payment p1 = Payment.builder()
                    .description("DOL720: 30% seña - 17,50% a 10 días")
                    .application(Application.NOAPLICA)
                    .percentage(0D)
                    .bonusPercentage(0)
                    .vigentePayment(vigentePayment)
                    .build();

            Payment p2 = Payment.builder()
                    .description("DOL720: 30% seña - 17,50% a 18 días")
                    .application(Application.DESCUENTO)
                    .percentage(8D)
                    .bonusPercentage(0)
                    .vigentePayment(vigentePayment)
                    .build();

            vigentePayment.getPayments().add(p1);
            vigentePayment.getPayments().add(p2);

            vigentesPaymentService.save(vigentePayment);
        }
    }

    private Provider provider(String tradeName, String legalName, String cuit, String phoneNumber,
                              Long companyId, Traveler traveler, List<Integer> listPrices) {
        return Provider.builder()
                .tradeName(tradeName)
                .legalName(legalName)
                .cuit(cuit)
                .phoneNumber(phoneNumber)
                .companyId(companyId)
                .traveler(traveler)
                .build();
    }

    private Traveler traveler(String fullName, String phoneNumber) {
        return Traveler.builder()
                .fullName(fullName)
                .phoneNumber(phoneNumber)
                .build();
    }
}