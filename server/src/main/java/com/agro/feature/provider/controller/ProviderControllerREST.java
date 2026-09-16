package com.agro.feature.provider.controller;

import com.agro.core.api.Api;
import com.agro.feature.provider.contracts.ProviderDataService;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.dtos.request.ProviderEditRequestDTO;
import com.agro.feature.provider.dtos.request.ProviderRequestDTO;
import com.agro.feature.provider.dtos.response.ProviderResponseDTO;
import com.agro.shared.dtos.table.PageResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping(Api.PROVIDER)
@Tag(name = "Proveedores", description = "Operaciones relacionadas a la gestión de proveedores")
public class ProviderControllerREST {

    private final ProviderDataService providerDataService;

    public ProviderControllerREST(ProviderDataService providerDataService) {
        this.providerDataService = providerDataService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('DUENIO', 'VENDEDOR', 'FACTURACION')")
    @Operation(summary = "Obtener los proveedores de forma paginada", description = "Devuelve los proveedores paginados.")
    public ResponseEntity<PageResponseDTO<ProviderResponseDTO>> getProviders(
            @RequestAttribute("userId") Long  userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String name
    ) {
        return ResponseEntity.ok(PageResponseDTO.from(
                providerDataService.getProviders(page, size, userId, name)
                        .map(ProviderResponseDTO::fromModel)
        ));
    }


    @GetMapping("/{providerId}")
    @PreAuthorize("hasAnyRole('DUENIO')")
    @Operation(summary = "Obtener un proveedor por un id")
    public ResponseEntity<ProviderResponseDTO> getProviderById(
            @PathVariable Long providerId
    ) {

        Provider provider = providerDataService.getProviderById(providerId);

        return ResponseEntity.ok(ProviderResponseDTO.fromModel(provider));
    }


    @PostMapping
    @PreAuthorize("hasAnyRole('DUENIO')")
    @Operation(summary = "Añadir un proveedor a una compañia")
    public ResponseEntity<ProviderResponseDTO> addProvider(
            @RequestAttribute("userId") Long  userId,
            @RequestBody @Valid  ProviderRequestDTO request
    ) {
        Provider provider = providerDataService.addProvider(userId, request.toModel());

        ProviderResponseDTO response = ProviderResponseDTO.fromModel(provider);

        return ResponseEntity.ok(response);
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('DUENIO')")
    @Operation(summary = "Editar un proveedor de una compañia")
    public ResponseEntity<ProviderResponseDTO> editProvider(
            @RequestAttribute("userId") Long  userId,
            @RequestBody @Valid ProviderEditRequestDTO request
    ) {
        Provider provider = providerDataService.editProvider(userId, request.toModel());

        ProviderResponseDTO response = ProviderResponseDTO.fromModel(provider);

        return ResponseEntity.ok(response);
    }
}
