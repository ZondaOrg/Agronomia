package com.agro.feature.payment.controller;

import com.agro.core.api.Api;
import com.agro.feature.payment.contracts.VigentesPaymentDataService;
import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.payment.dto.response.VigentePaymentsResponseDTO;
import com.agro.shared.dtos.table.ColumnHeaderDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(Api.PAYMENT)
@Tag(name = "Metodos de pagos", description = "Operaciones relacionadas a la gestión de metodos de pago")
public class VigentesPaymentControllerREST {

    private final VigentesPaymentDataService paymentDataService;

    public VigentesPaymentControllerREST(VigentesPaymentDataService paymentDataService) {
        this.paymentDataService = paymentDataService;
    }

    @GetMapping("/{providerId}")
    @PreAuthorize("hasAnyRole('DUENIO')")
    @Operation(summary = "Obtener los metodos de pago de un proveedor por un id")
    public ResponseEntity<VigentePaymentsResponseDTO> getProviderById(
            @PathVariable Long providerId
    ) {

        VigentePayment vigente = paymentDataService.getVigentePaymentsPaginatedById(providerId);

        List<ColumnHeaderDTO> columns = List.of(
                ColumnHeaderDTO.of("paymentMethod", "FORMA DE PAGO"),
                ColumnHeaderDTO.of("adjustment", "RECARGO/DESCUENTO"),
                ColumnHeaderDTO.of("percentage", "VALOR %"),
                ColumnHeaderDTO.of("bonusPercentage", "BONIFICACIÓN %")
        );

        return ResponseEntity.ok(VigentePaymentsResponseDTO.fromModel(vigente, columns));
    }
}
