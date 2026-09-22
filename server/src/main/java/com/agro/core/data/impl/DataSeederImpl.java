package com.agro.core.data.impl;

import com.agro.feature.branch.domain.Branch;
import com.agro.feature.client.domain.Client;
import com.agro.feature.client.domain.NaturalPerson;
import com.agro.feature.client.domain.RazonSocial;
import com.agro.feature.client.services.ClientService;
import com.agro.feature.company.domain.Company;
import com.agro.feature.image.domain.Imagen;
import com.agro.feature.payment.domain.Application;
import com.agro.feature.payment.domain.Payment;
import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.payment.service.VigentesPaymentService;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.services.ProductTypeService;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.domain.Traveler;
import com.agro.feature.provider.service.ProviderService;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.services.UserService;
import com.agro.core.data.DataSeeder;
import com.agro.shared.entities.province.Province;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.valueObjects.email.EmailValue;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Profile("dev")
public class DataSeederImpl implements DataSeeder {

    private final UserService userService;
    private final ProviderService providerService;
    private final ClientService clientService;
    private final VigentesPaymentService vigentesPaymentService;
    private final ProductTypeService productTypeService;

    public DataSeederImpl(
            UserService userService,
            ProviderService providerService,
            ClientService clientService,
            VigentesPaymentService vigentesPaymentService,
            ProductTypeService productTypeService
    ) {
        this.userService = userService;
        this.providerService = providerService;
        this.clientService = clientService;
        this.vigentesPaymentService = vigentesPaymentService;
        this.productTypeService = productTypeService;
    }

    @Override
    public void run(String... args) throws Exception {
        Branch branch = Branch.builder()
                .city("Berlin")
                .direction("street 123")
                .build();

        Branch branch2 = Branch.builder()
                .city("Argentina")
                .direction("street 123")
                .build();

        Branch branch3 = Branch.builder()
                .city("Berlin")
                .direction("street 123")
                .build();

        Branch branch4 = Branch.builder()
                .city("Argentina")
                .direction("street 123")
                .build();

        User user = User.builder()
                .name("Tomas")
                .surname("Mendoza")
                .email(new EmailValue("n2n@gmail.com"))
                .branch(branch)
                .role(Role.DUENIO)
                .password("123")
                .build();

        User otherUser = User.builder()
                .name("Tomas")
                .surname("Mendoza")
                .email(new EmailValue("vendedor@gmail.com"))
                .branch(branch2)
                .role(Role.VENDEDOR)
                .password("123")
                .build();

        Imagen imagen = Imagen.builder()
                .url("https://res.cloudinary.com/dvkvlpq07/image/upload/v1785440325/logo_tfzoil.jpg")
                .publicId("123123")
                .build();

        Company company = Company.builder()
                .name("AgroTech")
                .legalName("AgroTech S.A.")
                .cuit("30-12345678-9")
                .users(new ArrayList<>(List.of(user, otherUser)))
                .logo(imagen)
                .build();

        company.addBranches(new ArrayList<>(List.of(branch2, branch, branch3, branch4)));

        user.addCompany(company);
        otherUser.addCompany(company);

        userService.save(user);
        userService.save(otherUser);

        createProviders(company.getId());
        createClients(user.getId(), company.getId());
        createProductTypes();
    }

    private void createProviders(Long companyId) {
        List<Provider> providers = List.of(
                Provider.builder()
                        .tradeName("Agroinsumos del Sur")
                        .legalName("Agroinsumos del Sur S.R.L.")
                        .cuit("30-87654321-0")
                        .phoneNumber("11-4444-5555")
                        .companyId(companyId)
                        .listPrices(new ArrayList<>(List.of(1500, 2300, 3100)))
                        .build(),

                Provider.builder()
                        .tradeName("Insumos Pampa")
                        .legalName("Insumos Pampa S.A.")
                        .cuit("30-11223344-5")
                        .phoneNumber("11-9999-8888")
                        .companyId(companyId)
                        .traveler(Traveler.builder()
                                .fullName("Carlos Gomez")
                                .phoneNumber("11-5566-7788")
                                .build())
                        .listPrices(new ArrayList<>(List.of(800, 950)))
                        .build(),

                Provider.builder()
                        .tradeName("Insumos Pampa 2")
                        .legalName("Insumos Pampa S.A. 2")
                        .cuit("30-11223344-6")
                        .phoneNumber("11-9999-8888")
                        .companyId(companyId)
                        .listPrices(new ArrayList<>(List.of(800, 950)))
                        .build(),

                Provider.builder()
                        .tradeName("Claas Argentina")
                        .legalName("Claas Argentina S.A.")
                        .cuit("30-70928156-3")
                        .phoneNumber("+54 3492 44-0600")
                        .companyId(companyId)
                        .traveler(Traveler.builder()
                                .fullName("Federico Álvarez")
                                .phoneNumber("+54 9 3492 51-2290")
                                .build())
                        .listPrices(new ArrayList<>(List.of(4200, 5100, 6300, 7000)))
                        .build(),

                Provider.builder()
                        .tradeName("Agrometal")
                        .legalName("Agrometal S.A.I.C.")
                        .cuit("30-54892371-6")
                        .phoneNumber("351-4567-890")
                        .companyId(companyId)
                        .traveler(Traveler.builder()
                                .fullName("Lucía Fernández")
                                .phoneNumber("351-6789-012")
                                .build())
                        .listPrices(new ArrayList<>(List.of(2100, 2900)))
                        .build(),

                Provider.builder()
                        .tradeName("Pauny")
                        .legalName("Pauny Sociedad Anónima")
                        .cuit("30-70839658-4")
                        .phoneNumber("358-465-1122")
                        .companyId(companyId)
                        .build(),

                Provider.builder()
                        .tradeName("Vassalli Fabril")
                        .legalName("Vassalli Fabril S.A.")
                        .cuit("30-53821046-9")
                        .phoneNumber("341-762-3344")
                        .companyId(companyId)
                        .traveler(Traveler.builder()
                                .fullName("Martín Suárez")
                                .phoneNumber("341-889-5566")
                                .build())
                        .listPrices(new ArrayList<>(List.of(1800, 2400, 3000)))
                        .build(),

                Provider.builder()
                        .tradeName("Metalfor")
                        .legalName("Metalfor S.A.")
                        .cuit("30-61234789-2")
                        .phoneNumber("358-421-7788")
                        .companyId(companyId)
                        .build(),

                Provider.builder()
                        .tradeName("Apache Semillas")
                        .legalName("Apache Semillas S.A.")
                        .cuit("30-68974512-1")
                        .phoneNumber("341-556-9900")
                        .companyId(companyId)
                        .traveler(Traveler.builder()
                                .fullName("Sofía Ramírez")
                                .phoneNumber("341-334-1122")
                                .build())
                        .listPrices(new ArrayList<>(List.of(950, 1300, 1750, 2200)))
                        .build(),

                Provider.builder()
                        .tradeName("Don Mario Semillas")
                        .legalName("Don Mario Semillas S.A.")
                        .cuit("30-59873421-8")
                        .phoneNumber("3401-445-6677")
                        .companyId(companyId)
                        .build(),

                Provider.builder()
                        .tradeName("Insumos Vacíos")
                        .legalName("Insumos Vacíos S.A.")
                        .cuit("30-99999999-9")
                        .phoneNumber("11-1111-1111")
                        .companyId(companyId)
                        .build()
        );

        int[] paymentCounts = { 25, 18, 14, 10, 8, 6, 4, 3, 2, 1, 0 };
        int providerIndexWithoutVigente = providers.size() - 2;

        for (int i = 0; i < providers.size(); i++) {
            Provider provider = providers.get(i);
            Provider savedProvider = providerService.save(provider);

            if (i == providerIndexWithoutVigente) {
                continue;
            }

            VigentePayment vigentePayment = VigentePayment.builder()
                    .nameList("julio 2026")
                    .provider(savedProvider)
                    .payments(new ArrayList<>())
                    .build();

            int totalPayments = paymentCounts[i];
            for (int j = 1; j <= totalPayments; j++) {
                Application app;
                if (j % 3 == 0) {
                    app = Application.DESCUENTO;
                } else if (j % 3 == 1) {
                    app = Application.RECARGO;
                } else {
                    app = Application.NOAPLICA;
                }
                Payment p = Payment.builder()
                        .description("DOL720: Condición " + j + " - Plan " + totalPayments)
                        .application(app)
                        .percentage(j)
                        .bonusPercentage(j % 2 == 0 ? 5 : 0)
                        .vigentePayment(vigentePayment)
                        .build();

                vigentePayment.getPayments().add(p);
            }

            vigentesPaymentService.save(vigentePayment);
        }
    }

    private void createClients(Long companyId, Long userId) {
        List<Client> clients = List.of(
                new NaturalPerson(
                        "Carlos",
                        "Pérez",
                        "20-12345678-9",
                        "11-4455-6677",
                        "carlos.perez@gmail.com",
                        "Av. Rivadavia 1234",
                        "Buenos Aires",
                        Province.BuenosAires
                ),
                new NaturalPerson(
                        "María",
                        "González",
                        "27-23456789-3",
                        "351-778-8990",
                        "maria.gonzalez@gmail.com",
                        "Calle San Martín 456",
                        "Córdoba",
                        Province.Cordoba
                ),
                new NaturalPerson(
                        "Jorge",
                        "Ramírez",
                        "20-34567891-2",
                        "341-223-4455",
                        "jorge.ramirez@hotmail.com",
                        "Bv. Oroño 789",
                        "Rosario",
                        Province.SantaFe
                ),
                new RazonSocial(
                        "AgroSur S.A.",
                        "Federico",
                        "Álvarez",
                        "3492-51-2290",
                        "contacto@agrosur.com.ar",
                        "30-70928156-3",
                        "Ruta 9 Km 456",
                        "Marcos Juárez",
                        Province.Cordoba
                ),
                new RazonSocial(
                        "La Pampa Cereales S.R.L.",
                        "Lucía",
                        "Fernández",
                        "351-6789-012",
                        "info@lapampacereales.com.ar",
                        "30-54892371-6",
                        "Av. Colón 2345",
                        "Córdoba",
                        Province.Cordoba
                ),
                new RazonSocial(
                        "Vassalli Distribuidora S.A.",
                        "Martín",
                        "Suárez",
                        "341-889-5566",
                        "ventas@vassallidist.com.ar",
                        "30-53821046-9",
                        "Zona Industrial s/n",
                        "Firmat",
                        Province.SantaFe
                ),
                new NaturalPerson(
                        "Sofía",
                        "Ramírez",
                        "27-45678912-0",
                        "341-334-1122",
                        "sofia.ramirez@yahoo.com.ar",
                        "Calle Mitre 321",
                        "Casilda",
                        Province.SantaFe
                ),
                new RazonSocial(
                        "Don Mario Agro S.A.",
                        "Ezequiel",
                        "Torres",
                        "3401-778-2233",
                        "eze.torres@donmarioagro.com.ar",
                        "30-59873421-8",
                        "Parque Industrial",
                        "Chacabuco",
                        Province.BuenosAires
                )
        );

        clients.forEach(client -> {
            client.setCompanyId(companyId);
            clientService.save(client, userId);
        });
    }

    private void createProductTypes() {
        List<ProductType> productTypes = List.of(
                new ProductType(
                        "Tractor"
                ),
                new ProductType(
                        "Tolva auto descartable"
                ),
                new ProductType(
                        "Semillero"
                ),
                new ProductType(
                        "Acomplado"
                ),
                new ProductType(
                        "Desmalezadora"
                ),
                new ProductType(
                        "Mixer"
                ),
                new ProductType(
                        "Chimango"
                ),
                new ProductType(
                        "Comedor"
                ),
                new ProductType(
                        "Portarollo"
                ),
                new ProductType(
                        "Pala"
                )
        );

        productTypes.forEach(productTypeService::add);
    }
}