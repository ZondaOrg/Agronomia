package com.agro.feature.payment.contracts;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.payment.domain.Application;
import com.agro.feature.payment.domain.Payment;
import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.payment.service.VigentesPaymentService;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.service.ProviderService;
import com.agro.shared.service.ResetService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
public class VigentesPaymentDataServiceTest {

    @Container
    private static PostgreSQLContainer postgres = ContainerPostgresql.getContainer();

    @Autowired
    private VigentesPaymentDataService vigentesPaymentDataService;

    @Autowired
    private VigentesPaymentService vigentesPaymentService;

    @Autowired
    private ResetService resetService;

    @Autowired
    private ProviderService providerService;

    @Test
    @DisplayName("Debe retornar el VigentePayment asociado a un proveedor existente")
    void shouldReturnVigentePaymentWhenProviderExists() {
        Provider provider = Provider.builder()
                .tradeName("Proveedor Test")
                .legalName("Proveedor Test S.A.")
                .cuit("30-11111111-9")
                .phoneNumber("11-1234-5678")
                .companyId(1L)
                .build();

        Provider savedProvider = providerService.save(provider);

        VigentePayment vigentePayment = VigentePayment.builder()
                .nameList("Agosto 2026")
                .provider(savedProvider)
                .payments(new ArrayList<>())
                .build();

        Payment payment = new Payment(null, "Contado", Application.NOAPLICA, 0, 0, vigentePayment);
        vigentePayment.getPayments().add(payment);

        vigentesPaymentService.save(vigentePayment);

        VigentePayment result = vigentesPaymentDataService.getVigentePaymentsPaginatedById(savedProvider.getId());

        assertThat(result).isNotNull();
        assertThat(result.getNameList()).isEqualTo("Agosto 2026");
        assertThat(result.getPayments()).hasSize(1);
        assertThat(result.getProvider().getId()).isEqualTo(savedProvider.getId());
    }

    @Test
    @DisplayName("Debe retornar null o manejar correctamente si el proveedor no tiene pagos vigentes")
    void shouldReturnNullWhenVigentePaymentDoesNotExist() {

        Provider provider = Provider.builder()
                .tradeName("Proveedor Sin Pagos")
                .legalName("Proveedor Sin Pagos S.A.")
                .cuit("30-22222222-9")
                .phoneNumber("11-8765-4321")
                .companyId(1L)
                .build();

        Provider savedProvider = providerService.save(provider);


        VigentePayment result = vigentesPaymentDataService.getVigentePaymentsPaginatedById(savedProvider.getId());

        assertThat(result).isNull();
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}