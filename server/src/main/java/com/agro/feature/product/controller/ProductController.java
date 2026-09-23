package com.agro.feature.product.controller;

import com.agro.core.api.Api;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.add.AddProductMapper;
import com.agro.feature.product.dtos.add.AddedOptionalsMapper;
import com.agro.feature.product.dtos.add.request.AddProductRequestDTO;
import com.agro.feature.product.dtos.add.response.AddProductResponseDTO;
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
    @Operation(summary = "Agregar Productos de un proveedor por un id")
    public ResponseEntity<AddProductResponseDTO> add(
            @RequestBody @Valid AddProductRequestDTO request,
            @PathVariable Long providerId
    ){
        Product product = AddProductMapper.dtoToModel(request);
        Product productWithOptionals = AddedOptionalsMapper.dtosToModels(product, request.optionals());
        Product addedProduct = productService.add(productWithOptionals, request.type(), providerId);
        AddProductResponseDTO productResponseDto = AddProductMapper.modelToDto(addedProduct);
        return ResponseEntity.ok(productResponseDto);
    }
}
