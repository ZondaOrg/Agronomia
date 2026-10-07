package com.agro.feature.productType.services.impl;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.branch.domain.Branch;
import com.agro.feature.branch.persistence.BranchDAO;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.service.CompanyService;
import com.agro.feature.image.domain.Imagen;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.domain.exceptions.NameDuplicated;
import com.agro.feature.productType.persistence.ProductTypeDAO;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.orchestrator.RegisterOrchestrator;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.service.ResetService;
import com.agro.shared.valueObjects.email.EmailValue;
import jakarta.persistence.EntityNotFoundException;
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
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Testcontainers
class ProductTypeServiceImplTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired
    private ProductTypeServiceImpl service;

    @Autowired
    private ProductTypeDAO dao;

    @Autowired
    private ResetService reset;

    @Autowired
    private RegisterOrchestrator orchestrator;

    @Autowired
    private BranchDAO branchDAO;

    @Autowired
    private CompanyService companyService;

    private static  Imagen DEFAULT_IMAGE;

    private ProductType productType;

    private Company company;

    private Company otherCompany;

    private User owner;

    private User otherOwner;

    @BeforeEach
    void setUp() {
        productType = ProductType.builder().name("Tractorcito").build();

        DEFAULT_IMAGE = Imagen.builder()
                .url("https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166428/Default_rjsfk7.png")
                .publicId("Default_rjsfk7")
                .build();

        Branch branch = branchDAO.save(Branch.builder()
                .city("Berlin")
                .direction("street 123")
                .build());

        company = createCompany("30-11111111-1", "Empresa 1");
        otherCompany = createCompany("30-22222222-2", "Empresa 2");

        owner = registerUser("owner@gmail.com", company, branch);
        otherOwner = registerUser("other-owner@gmail.com", otherCompany, branch);
    }

    @Test
    void testSeAgregaUnTipoDeProcuto() {
        ProductType addedProductType = service.add(productType);
        assertNotNull(addedProductType.getId());
    }

    @Test
    void testSeRecuperanTodosLosTiposDeProductos() {
        service.add(productType);
        service.add(ProductType.builder().name("Pala").build());
        service.add(ProductType.builder().name("Cosechadora").build());
        List<ProductType> productTypes = service.getAll();
        assertTrue(productTypes.stream().anyMatch(productType -> Objects.equals(productType.getName(), "Tractorcito")));
        assertTrue(productTypes.stream().anyMatch(productType -> Objects.equals(productType.getName(), "Cosechadora")));
    }

    @Test
    void testGetAllPaginated_TraeSoloLosTiposDeLaEmpresaDelUsuario() {
        service.addAllInCompany(types("Pala", "Mixer", "Chimango"), company.getId());
        service.addAllInCompany(types("Semillero", "Portarollo"), otherCompany.getId());

        Page<ProductType> result = service.getAllPaginated(owner.getId(), 0, 10);

        assertEquals(3, result.getTotalElements());
        assertEquals(Set.of("Pala", "Mixer", "Chimango"), namesOf(result));
        assertTrue(result.stream().allMatch(t -> Objects.equals(t.getIdCompany(), company.getId())));
    }

    @Test
    void testGetAllPaginated_RespetaTamanioYTotalesDePagina() {
        service.addAllInCompany(types("A", "B", "C", "D", "E"), company.getId());

        Page<ProductType> firstPage = service.getAllPaginated(owner.getId(), 0, 2);
        Page<ProductType> lastPage = service.getAllPaginated(owner.getId(), 2, 2);

        assertEquals(2, firstPage.getContent().size());
        assertEquals(5, firstPage.getTotalElements());
        assertEquals(3, firstPage.getTotalPages());
        assertEquals(1, lastPage.getContent().size());
    }

    @Test
    void testGetAllPaginated_LasPaginasCubrenTodosLosTiposSinRepetir() {
        service.addAllInCompany(types("A", "B", "C", "D", "E"), company.getId());

        List<String> names = new ArrayList<>();
        for (int page = 0; page < 3; page++) {
            names.addAll(service.getAllPaginated(owner.getId(), page, 2).stream()
                    .map(ProductType::getName)
                    .toList());
        }

        assertEquals(5, names.size());
        assertEquals(Set.of("A", "B", "C", "D", "E"), Set.copyOf(names));
    }

    @Test
    void testGetAllPaginated_UnaPaginaFueraDeRangoDevuelveContenidoVacio() {
        service.addAllInCompany(types("A", "B", "C"), company.getId());

        Page<ProductType> result = service.getAllPaginated(owner.getId(), 5, 2);

        assertTrue(result.getContent().isEmpty());
        assertEquals(3, result.getTotalElements());
    }

    @Test
    void testGetAllPaginated_UnaEmpresaSinTiposDevuelvePaginaVacia() {
        service.addAllInCompany(types("A", "B"), company.getId());

        Page<ProductType> result = service.getAllPaginated(otherOwner.getId(), 0, 10);

        assertTrue(result.isEmpty());
        assertEquals(0, result.getTotalElements());
    }

    @Test
    void testGetAllPaginated_ConUsuarioInexistenteLanzaExcepcion() {
        assertThrows(EntityNotFoundException.class, () -> service.getAllPaginated(0L, 0, 10));
    }

    @Test
    void testCreateNewTypeProduct() {
        ProductType newProductType = service.addTypeInCompany(ProductType.builder().name("Camioncito").build(), owner.getId());
        ProductType recovered = service.getProductTypeById(newProductType.getId());

        assertNotNull(newProductType.getId());
        assertEquals(newProductType.getName(), recovered.getName());
        assertEquals(recovered.getImagen(), newProductType.getImagen());
        assertEquals(owner.getCompany().getId(), recovered.getIdCompany());
    }

    @Test
    void testDuplicatedTypeProductWithName() {
        service.addTypeInCompany(productType, owner.getId());

        assertThrows(NameDuplicated.class,  () -> service.addTypeInCompany(productType, owner.getId()));
    }

    @AfterEach
    void tearDown() {
        reset.resetAll();
    }

    private Company createCompany(String cuit, String name) {
        return companyService.save(Company.builder()
                .cuit(cuit)
                .logo(Imagen.builder().url("logo-" + name).publicId("pid-" + name).build())
                .name(name)
                .legalName(name + " S.A.")
                .build());
    }

    private User registerUser(String email, Company userCompany, Branch branch) {
        User newUser = User.builder()
                .name("Test")
                .email(new EmailValue(email))
                .role(Role.DUENIO)
                .build();
        return orchestrator.register(newUser, userCompany.getId(), branch.getId());
    }

    private List<ProductType> types(String... names) {
        return Arrays.stream(names)
                .map(name -> ProductType.builder().name(name).build())
                .collect(Collectors.toList());
    }

    private Set<String> namesOf(Page<ProductType> page) {
        return page.stream().map(ProductType::getName).collect(Collectors.toSet());
    }
}