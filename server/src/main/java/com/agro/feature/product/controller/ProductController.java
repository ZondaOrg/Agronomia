package com.agro.feature.product.controller;

import com.agro.core.api.Api;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.add.AddProductMapper;
import com.agro.feature.product.dtos.add.AddedOptionalsMapper;
import com.agro.feature.product.dtos.add.request.AddProductRequestDTO;
import com.agro.feature.product.dtos.add.response.AddProductResponseDTO;
import com.agro.feature.product.dtos.getComplete.TableProductMapper;
import com.agro.feature.product.dtos.getComplete.response.ProductRowRequestDTO;
import com.agro.feature.product.services.ProductService;
import com.agro.shared.annotations.role.OwnerEndpoint;
import com.agro.shared.dtos.table.TableResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
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

    @GetMapping("/page-of/{providerId}")
    @Operation(summary = "Busca Productos paginados con formato de tabla y con un criterio de busqueda")
    public ResponseEntity<TableResponseDTO<ProductRowRequestDTO>> pageOfProductsWith(
            @PathVariable Long providerId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "5") Integer size,
            @RequestParam(defaultValue = "") String search
    ) {
        Page<Product> pagesOfProducts = productService.getPageOfProducts(page, size, search, providerId);
        return ResponseEntity.ok(TableProductMapper.modelToDto(pagesOfProducts));
    }
}
