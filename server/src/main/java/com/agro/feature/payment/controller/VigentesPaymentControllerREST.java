package com.agro.feature.payment.controller;

import com.agro.core.api.Api;
import com.agro.feature.payment.contracts.VigentesPaymentDataService;
import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.payment.dto.request.VigentePaymentsRequestDTO;
import com.agro.feature.payment.dto.request.VigentePaymentsUpdateDTO;
import com.agro.feature.payment.dto.response.VigentPaymentsResponseSimpleDTO;
import com.agro.feature.payment.dto.response.VigentePaymentsTableResponseDTO;
import com.agro.shared.annotations.role.OwnerEndpoint;
import com.agro.shared.dtos.table.ColumnHeaderDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("table/{providerId}")
    @OwnerEndpoint
    @Operation(summary = "Obtener los metodos de pago de un proveedor por un id en formato tabla")
    public ResponseEntity<VigentePaymentsTableResponseDTO> getProviderById(
            @PathVariable Long providerId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size
    ) {

        VigentePayment vigente = paymentDataService.getVigentPaymentsById(providerId);

        List<ColumnHeaderDTO> columns = List.of(
                ColumnHeaderDTO.of("description", "FORMA DE PAGO"),
                ColumnHeaderDTO.of("application", "RECARGO/DESCUENTO"),
                ColumnHeaderDTO.of("percentage", "VALOR %"),
                ColumnHeaderDTO.of("bonusPercentage", "BONIFICACIÓN %")
        );

        return ResponseEntity.ok(VigentePaymentsTableResponseDTO.fromModel(vigente, columns, page, size));
    }

    @GetMapping("/{providerId}")
    @Operation(summary = "Obtener los metodos de pago de un proveedor por un id y su descripcion")
    public ResponseEntity<VigentPaymentsResponseSimpleDTO> searchVigentPaymentsByProviderId(@PathVariable Long providerId, @RequestParam String description) {
        VigentePayment vigente = paymentDataService.searchVigentPaymentsByProviderId(providerId, description);

        return ResponseEntity.ok(VigentPaymentsResponseSimpleDTO.fromModel(vigente));
    }

    @PostMapping()
    @OwnerEndpoint
    @Operation(summary = "Crear metodos de pago de un proveedor por un id")
    public ResponseEntity<VigentPaymentsResponseSimpleDTO> createVigentePayment(
            @RequestBody @Valid VigentePaymentsRequestDTO request
    ){
        VigentePayment vigent = paymentDataService.createVigentePayment(request.toModel(), request.providerId());
        return ResponseEntity.ok(VigentPaymentsResponseSimpleDTO.fromModel(vigent));
    }

    @PutMapping()
    @OwnerEndpoint
    @Operation(summary = "Actualizar metodos de pago de un proveedor por un id")
    public ResponseEntity<VigentPaymentsResponseSimpleDTO> updateVigentePayment(
            @RequestBody @Valid VigentePaymentsUpdateDTO request
    ){
        VigentePayment vigent = paymentDataService.updateVigent(request.vigentId(), request.deletePayments(), request.toModel());

        return ResponseEntity.ok(VigentPaymentsResponseSimpleDTO.fromModel(vigent));
    }
}
