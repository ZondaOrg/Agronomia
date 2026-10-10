package com.agro.core.data.impl;

import com.agro.core.data.seeder.entity.SeedContext;
import com.agro.core.data.seeder.impl.ProductTypeSeeder;
import com.agro.feature.branch.domain.Branch;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.persistence.daos.CompanyDAO;
import com.agro.feature.image.domain.Imagen;
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

import java.util.List;

@Component
@Profile("seed")
public class ProductionDataSeeder implements CommandLineRunner {

    private static final String COMPANY_CUIT = "30-12345678-9";

    @Value("${EMAIL_OWNER}")
    private String ownerEmail;

    @Value("${OWNER_PASSWORD}")
    private String ownerPassword;

    @Value("${EMAIL_SELLER}")
    private String sellerEmail;

    @Value("${SELLER_PASSWORD}")
    private String sellerPassword;

    private final CompanyDAO companyDAO;
    private final UserDAO userDAO;
    private final UserService userService;
    private final ProductTypeSeeder productTypeSeeder;

    public ProductionDataSeeder(
            CompanyDAO companyDAO,
            UserDAO userDAO,
            UserService userService,
            ProductTypeSeeder productTypeSeeder
    ) {
        this.companyDAO = companyDAO;
        this.userDAO = userDAO;
        this.userService = userService;
        this.productTypeSeeder = productTypeSeeder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        boolean companyExisted = companyDAO.findFirstByCuit(COMPANY_CUIT).isPresent();
        Company company = companyDAO.findFirstByCuit(COMPANY_CUIT)
                .orElseGet(this::createCompany);

        User owner = null;
        if (!userDAO.existsByEmail(new EmailValue(ownerEmail))) {
            owner = createUser(company, "Tomas", "Mendoza", ownerEmail, ownerPassword, Role.DUENIO);
        }

        if (!userDAO.existsByEmail(new EmailValue(sellerEmail))) {
            createUser(company, "Tomas", "Mendoza", sellerEmail, sellerPassword, Role.VENDEDOR);
        }

        // Los tipos tienen nombre unico, asi que solo se cargan la primera vez
        if (!companyExisted) {
            SeedContext context = new SeedContext();
            context.setCompanyId(company.getId());
            if (owner != null) {
                context.setOwnerUserId(owner.getId());
            }
            productTypeSeeder.seed(context);
        }
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

    private User createUser(Company company, String name, String surname,
                            String email, String password, Role role) {
        User user = User.builder()
                .name(name)
                .surname(surname)
                .email(new EmailValue(email))
                .branch(company.getBranches().get(0))
                .role(role)
                .password(password)
                .build();

        company.addUser(user);
        userService.save(user);
        return user;
    }
}