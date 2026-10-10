package com.agro.core;

import com.agro.feature.branch.domain.Branch;
import com.agro.feature.branch.persistence.BranchDAO;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.service.CompanyService;
import com.agro.feature.image.domain.Imagen;
import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Product;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.services.ProductTypeService;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.service.ProviderService;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.orchestrator.RegisterOrchestrator;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.valueObjects.email.EmailValue;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class TestFixtures {

    /** Tipos por defecto, en orden de creación. */
    public static final List<String> DEFAULT_TYPE_NAMES =
            List.of("Semillero", "Tractor", "Pala", "Cosechadora");

    private final BranchDAO branchDAO;
    private final CompanyService companyService;
    private final RegisterOrchestrator orchestrator;
    private final ProductTypeService productTypeService;
    private final ProviderService providerService;

    public TestFixtures(
            BranchDAO branchDAO,
            CompanyService companyService,
            RegisterOrchestrator orchestrator,
            ProductTypeService productTypeService,
            ProviderService providerService
    ) {
        this.branchDAO = branchDAO;
        this.companyService = companyService;
        this.orchestrator = orchestrator;
        this.productTypeService = productTypeService;
        this.providerService = providerService;
    }

    /** Empresa + sucursal + owner ya registrados. */
    public record Tenant(Company company, Branch branch, User owner) {}

    public Tenant tenant(String companyName, String cuit, String ownerEmail) {
        Branch branch = branch();
        Company company = company(cuit, companyName);
        User owner = owner(ownerEmail, company, branch);
        return new Tenant(company, branch, owner);
    }

    public Branch branch() {
        return branchDAO.save(Branch.builder()
                .city("Berlin")
                .direction("street 123")
                .build());
    }

    public Company company(String cuit, String name) {
        return companyService.save(Company.builder()
                .cuit(cuit)
                .logo(Imagen.builder().url("logo-" + name).publicId("pid-" + name).build())
                .name(name)
                .legalName(name + " S.A.")
                .build());
    }

    public User owner(String email, Company company, Branch branch) {
        User newUser = User.builder()
                .name("Test")
                .email(new EmailValue(email))
                .role(Role.DUENIO)
                .build();
        return orchestrator.register(newUser, company.getId(), branch.getId());
    }

    public ProductType type(String name) {
        return ProductType.builder().name(name).build();
    }

    public List<ProductType> types(String... names) {
        return Arrays.stream(names).map(this::type).toList();
    }

    /** Crea y persiste un tipo dentro de la empresa del usuario. */
    public ProductType savedType(String name, Long ownerId) {
        return productTypeService.addTypeInCompany(type(name), ownerId);
    }

    /** Crea y persiste los tipos dados en la empresa del owner. Devuelve nombre -> tipo. */
    public Map<String, ProductType> savedTypes(Long ownerId, String... names) {
        Map<String, ProductType> saved = new LinkedHashMap<>();
        for (String name : names) {
            saved.put(name, savedType(name, ownerId));
        }
        return saved;
    }

    /** Los tipos por defecto ya persistidos. */
    public Map<String, ProductType> defaultTypes(Long ownerId) {
        return savedTypes(ownerId, DEFAULT_TYPE_NAMES.toArray(String[]::new));
    }

    public Provider provider(Long companyId) {
        return providerService.save(Provider.builder()
                .tradeName("Proveedor Test")
                .legalName("Proveedor Test S.A.")
                .cuit("30-11111111-9")
                .phoneNumber("11-1234-5678")
                .companyId(companyId)
                .build());
    }

    public Provider provider(Long companyId, String tradeName, String cuit) {
        return providerService.save(Provider.builder()
                .tradeName(tradeName)
                .legalName(tradeName + " S.A.")
                .cuit(cuit)
                .phoneNumber("11-1234-5678")
                .companyId(companyId)
                .build());
    }

    public Product product(String name, Long typeId) {
        return new Product(name, "product nss", Money.ARS, 10000000d, IVA.GENERAL, typeId, 20);
    }
}