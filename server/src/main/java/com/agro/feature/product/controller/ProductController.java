package com.agro.feature.product.controller;

import com.agro.core.api.Api;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.ProductMapper;
import com.agro.feature.product.dtos.request.AddProductRequestDTO;
import com.agro.feature.product.dtos.response.AddProductResponseDTO;
import com.agro.feature.product.services.ProductService;
import com.agro.shared.annotations.role.OwnerEndpoint;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Api.PRODUCT)
@Tag(name = "Metodos de pagos", description = "Operaciones relacionadas a la gestión de metodos de pago")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add/{providerId}")
    @OwnerEndpoint
    @Operation(summary = "Crear metodos de pago de un proveedor por un id")
    public ResponseEntity<AddProductResponseDTO> add(
            @RequestBody @Valid AddProductRequestDTO request,
            @PathVariable Long providerId
    ){
        Product product = ProductMapper.dtoToModel(request);
        Product addedProduct = productService.add(product, request.type(), providerId);
        AddProductResponseDTO productResponseDto = ProductMapper.modelToDto(addedProduct);
        return ResponseEntity.ok(productResponseDto);
    }
}
