package com.agro.feature.productType.controller;

import com.agro.core.api.Api;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.dtos.getAll.GetProductTypeMapper;
import com.agro.feature.productType.dtos.getAll.GetProductTypeResponseDTO;
import com.agro.feature.productType.services.ProductTypeService;
import com.agro.shared.annotations.role.OwnerEndpoint;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController(Api.PRODUCT_TYPE)
public class ProductTypeController {

    private ProductTypeService service;

    public ProductTypeController(ProductTypeService service) {
        this.service = service;
    }

    @GetMapping
    @OwnerEndpoint
    @Operation(summary = "Obtener todos los tipos de productos precargados")
    public ResponseEntity<List<GetProductTypeResponseDTO>> getAll() {
        List<ProductType> productTypes = service.getAll();
        return ResponseEntity.ok(productTypes.stream().map(GetProductTypeMapper::modelToDto).toList());
    }
}
