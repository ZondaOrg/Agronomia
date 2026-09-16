package com.agro.feature.payment.controller;

import com.agro.core.api.Api;
import com.agro.feature.payment.contracts.PaymentDataService;
import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.payment.dto.response.VigentePaymentsResponseDTO;
import com.agro.shared.dtos.table.ColumnHeaderDTO;
import com.agro.shared.dtos.table.TableResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(Api.PROVIDER)
@Tag(name = "Metodos de pagos", description = "Operaciones relacionadas a la gestión de metodos de pago")
public class PaymentControllerREST {

    private final PaymentDataService  paymentDataService;

    public PaymentControllerREST(PaymentDataService paymentDataService) {
        this.paymentDataService = paymentDataService;
    }

    @GetMapping("/{providerId}")
    @PreAuthorize("hasAnyRole('DUENIO')")
    @Operation(summary = "Obtener los metodos de pago de un proveedor por un id")
    public ResponseEntity<VigentePaymentsResponseDTO> getProviderById(
            @PathVariable Long providerId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size
    ) {

        VigentePayment vigente = paymentDataService.getVigentePaymentsPaginatedById(providerId, page, size);

        List<ColumnHeaderDTO> columns = List.of(
                ColumnHeaderDTO.of("paymentMethod", "FORMA DE PAGO"),
                ColumnHeaderDTO.of("adjustment", "RECARGO/DESCUENTO"),
                ColumnHeaderDTO.of("percentage", "VALOR %"),
                ColumnHeaderDTO.of("bonusPercentage", "BONIFICACIÓN %")
        );

        return ResponseEntity.ok(VigentePaymentsResponseDTO.fromModel(vigente, columns));
    }
}
