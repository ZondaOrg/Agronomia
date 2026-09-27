package com.agro.feature.product.controller;

import com.agro.core.api.Api;
import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.dtos.OptionalResponseDTO;
import com.agro.feature.product.dtos.get.GetOptionalTable;
import com.agro.feature.product.services.OptionalService;
import com.agro.feature.product.services.ProductService;
import com.agro.shared.annotations.role.OwnerEndpoint;
import com.agro.shared.dtos.table.TableResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Api.OPTIONAL)
@Tag(name = "Opcionales de productos", description = "Operaciones relacionadas a la gestión de opcionales")
public class OptionalController {
    private final OptionalService optionalService;

    public OptionalController(ProductService productService, OptionalService optionalService) {
        this.optionalService = optionalService;
    }

    @GetMapping("/page-off/{productId}")
    @OwnerEndpoint
    @Operation(summary = "Recuperar opcionales de un producto páginados")
    public ResponseEntity<TableResponseDTO<OptionalResponseDTO>> pageOfProductsWith(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "5") Integer size
    ) {
        Page<Optional> pageOffOptionals = optionalService.getPagesOffOptionals(productId, page, size);
        return ResponseEntity.ok(GetOptionalTable.modelsToDto(pageOffOptionals));
    }
}
