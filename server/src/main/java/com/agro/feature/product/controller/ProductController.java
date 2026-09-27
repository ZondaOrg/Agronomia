package com.agro.feature.product.controller;

import com.agro.core.api.Api;
import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.add.AddProductMapper;
import com.agro.feature.product.dtos.add.AddedOptionalsMapper;
import com.agro.feature.product.dtos.add.request.AddProductRequestDTO;
import com.agro.feature.product.dtos.add.response.AddProductResponseDTO;
import com.agro.feature.product.dtos.edit.request.EditOptionalMapper;
import com.agro.feature.product.dtos.edit.request.EditProductRequestDTO;
import com.agro.feature.product.dtos.get.GetProductMapper;
import com.agro.feature.product.dtos.get.GetProductResponseDTO;
import com.agro.feature.product.dtos.table.TableProductMapper;
import com.agro.feature.product.dtos.table.response.ProductRowRequestDTO;
import com.agro.feature.product.services.OptionalService;
import com.agro.feature.product.services.ProductService;
import com.agro.shared.annotations.role.OwnerEndpoint;
import com.agro.shared.dtos.table.TableResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Api.PRODUCT)
@Tag(name = "Productos", description = "Operaciones relacionadas a la gestión de productos")
public class ProductController {

    private final ProductService productService;
    private final OptionalService optionalService;

    public ProductController(ProductService productService, OptionalService optionalService) {
        this.productService = productService;
        this.optionalService = optionalService;
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

    @PutMapping("/edit/{productId}")
    @Operation(summary = "Editar un producto por su id")
    @OwnerEndpoint
    public ResponseEntity<AddProductResponseDTO> edit(
            @RequestBody @Valid EditProductRequestDTO request,
            @PathVariable Long productId
    ){
        Product addedProduct = productService.findByIdWithinOptionals(productId);
        List<Optional> optionals = EditOptionalMapper.dtosToModels(request.optionalsToAdd(), addedProduct);
        Product editedProduct = productService.edit(
                addedProduct,
                request.money(),
                request.listPrice(),
                request.iva(),
                request.bonification(),
                request.freight(),
                optionals,
                request.optionalsToDelete()
        );
        AddProductResponseDTO productResponseDto = AddProductMapper.modelToDto(editedProduct);
        return ResponseEntity.ok(productResponseDto);
    }

    @GetMapping("find/{productId}")
    @Operation(summary = "Buscar un Producto por su id")
    public ResponseEntity<GetProductResponseDTO> get(
            @PathVariable Long productId
    ) {
        Product product = productService.findByIdWithinOptionals(productId);
        Page<Optional> pageOffOptionals = optionalService.getPagesOffOptionals(productId, 0, 4);
        GetProductResponseDTO productResponseDto = GetProductMapper.modelToDto(product, pageOffOptionals);
        return ResponseEntity.ok(productResponseDto);
    }
}
