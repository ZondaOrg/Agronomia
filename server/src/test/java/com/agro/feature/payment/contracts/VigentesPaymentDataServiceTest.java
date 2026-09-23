package com.agro.feature.payment.contracts;

import com.agro.core.ContainerPostgresql;
import com.agro.feature.payment.domain.Application;
import com.agro.feature.payment.domain.Payment;
import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.payment.persistence.dao.PaymentDAO;
import com.agro.feature.payment.service.VigentesPaymentService;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.service.ProviderService;
import com.agro.shared.service.ResetService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.support.TransactionTemplate;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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

    @Autowired
    private PaymentDAO paymentDAO;

    @Autowired
    private EntityManager entityManager;
    @Autowired
    private TransactionTemplate transactionTemplate;

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

        Payment payment = Payment.builder()
                .description("Contado")
                .application(Application.NOAPLICA)
                .percentage(0)
                .bonusPercentage(0)
                .vigentePayment(vigentePayment)
                .build();
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

    @Test
    @DisplayName("Debe crear un VigentePayment asociado al proveedor")
    void shouldCreateVigentePayment() {
        Provider provider = Provider.builder()
                .tradeName("Proveedor Create")
                .legalName("Proveedor Create S.A.")
                .cuit("30-33333333-9")
                .phoneNumber("11-1111-2222")
                .companyId(1L)
                .build();

        Provider savedProvider = providerService.save(provider);

        VigentePayment model = VigentePayment.builder()
                .nameList("Septiembre 2026")
                .payments(new ArrayList<>())
                .build();

        Payment payment = Payment.builder()
                .description("Transferencia")
                .application(Application.DESCUENTO)
                .percentage(10)
                .bonusPercentage(0)
                .build();

        model.getPayments().add(payment);

        VigentePayment created = vigentesPaymentDataService.createVigentePayment(model, savedProvider.getId());

        assertThat(created).isNotNull();
        assertThat(created.getId()).isNotNull();
        assertThat(created.getNameList()).isEqualTo("Septiembre 2026");
        assertThat(created.getProvider().getId()).isEqualTo(savedProvider.getId());
        assertThat(created.getPayments()).hasSize(1);
        assertThat(created.getPayments().get(0).getVigentePayment().getId()).isEqualTo(created.getId());
    }

    @Test
    @DisplayName("Debe actualizar un VigentePayment existente agregando nuevos pagos")
    void shouldUpdateVigentePaymentAndAddNewPayments() {
        Provider provider = Provider.builder()
                .tradeName("Proveedor Update")
                .legalName("Proveedor Update S.A.")
                .cuit("30-44444444-9")
                .phoneNumber("11-3333-4444")
                .companyId(1L)
                .build();

        Provider savedProvider = providerService.save(provider);

        VigentePayment existing = VigentePayment.builder()
                .nameList("Lista Vieja")
                .provider(savedProvider)
                .payments(new ArrayList<>())
                .build();

        existing = vigentesPaymentService.save(existing);

        VigentePayment updateModel = VigentePayment.builder()
                .nameList("Lista Nueva")
                .payments(new ArrayList<>())
                .build();

        Payment newPayment = Payment.builder()
                .description("Cheque")
                .application(Application.RECARGO)
                .percentage(5)
                .bonusPercentage(2)
                .vigentePayment(existing)
                .build();

        updateModel.getPayments().add(newPayment);

        VigentePayment updated = vigentesPaymentDataService.updateVigent(existing.getId(), null, updateModel);

        assertThat(updated.getNameList()).isEqualTo("Lista Nueva");
        assertThat(updated.getPayments()).hasSize(1);
        assertThat(updated.getPayments().get(0).getDescription()).isEqualTo("Cheque");
    }

    @Test
    @DisplayName("Debe actualizar un VigentePayment y aplicar soft delete a los pagos indicados")
    void shouldUpdateVigentePaymentAndSoftDeletePayments() {
        Provider provider = Provider.builder()
                .tradeName("Proveedor Soft Delete")
                .legalName("Proveedor Soft Delete S.A.")
                .cuit("30-55555555-9")
                .phoneNumber("11-5555-6666")
                .companyId(1L)
                .build();

        Provider savedProvider = providerService.save(provider);

        VigentePayment existing = VigentePayment.builder()
                .nameList("Lista a eliminar pagos")
                .provider(savedProvider)
                .payments(new ArrayList<>())
                .build();

        Payment paymentToKeep = Payment.builder()
                .description("Mantener")
                .application(Application.NOAPLICA)
                .percentage(0)
                .bonusPercentage(0)
                .vigentePayment(existing)
                .build();

        Payment paymentToDelete = Payment.builder()
                .description("Eliminar")
                .application(Application.NOAPLICA)
                .percentage(0)
                .bonusPercentage(0)
                .vigentePayment(existing)
                .build();

        existing.getPayments().add(paymentToKeep);
        existing.getPayments().add(paymentToDelete);

        existing = vigentesPaymentService.save(existing);

        Long deletedId = existing.getPayments().stream()
                .filter(p -> p.getDescription().equals("Eliminar"))
                .findFirst()
                .orElseThrow()
                .getId();

        VigentePayment updateModel = VigentePayment.builder()
                .nameList("Lista Actualizada")
                .payments(new ArrayList<>())
                .build();

        VigentePayment updated = vigentesPaymentDataService.updateVigent(existing.getId(), List.of(deletedId), updateModel);

        Optional<Payment> deletedPayment = paymentDAO.findById(deletedId);

        assertThat(updated.getNameList()).isEqualTo("Lista Actualizada");
        assertThat(deletedPayment).isEmpty();
    }

    @Test
    @DisplayName("Debe lanzar EntityNotFoundException al intentar actualizar un VigentePayment inexistente")
    void shouldThrowExceptionWhenUpdatingNonExistentVigentePayment() {
        VigentePayment updateModel = VigentePayment.builder()
                .nameList("Fallo")
                .payments(new ArrayList<>())
                .build();

        assertThatThrownBy(() -> vigentesPaymentDataService.updateVigent(999L, null, updateModel))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("No se encontro el metodo de pago");
    }

    @Test
    @DisplayName("Debe setear updateAt al crear y actualizarlo al modificar el VigentePayment")
    void shouldSetAndUpdateTimestampOnUpdate() {
        Provider provider = Provider.builder()
                .tradeName("Proveedor Timestamp")
                .legalName("Proveedor Timestamp S.A.")
                .cuit("30-66666666-9")
                .phoneNumber("11-7777-8888")
                .companyId(1L)
                .build();

        Provider savedProvider = providerService.save(provider);

        VigentePayment created = vigentesPaymentDataService.createVigentePayment(
                VigentePayment.builder()
                        .nameList("Lista Timestamp")
                        .payments(new ArrayList<>())
                        .build(),
                savedProvider.getId()
        );

        assertThat(created.getUpdateAt()).isNotNull();

        LocalDateTime backdated = LocalDateTime.now().minusDays(1);

        transactionTemplate.execute(status -> {
            entityManager.createQuery("UPDATE vigent_payments v SET v.updateAt = :backdated WHERE v.id = :id")
                    .setParameter("backdated", backdated)
                    .setParameter("id", created.getId())
                    .executeUpdate();
            return null;
        });
        entityManager.clear();

        VigentePayment updateModel = VigentePayment.builder()
                .nameList("Lista Timestamp Actualizada")
                .payments(new ArrayList<>())
                .build();

        VigentePayment updated = vigentesPaymentDataService.updateVigent(created.getId(), null, updateModel);

        assertThat(updated.getUpdateAt()).isNotNull();
        assertThat(updated.getUpdateAt()).isAfter(backdated);
    }

    @AfterEach
    void tearDown() {
        resetService.resetAll();
    }
}