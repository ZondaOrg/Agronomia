package com.agro.feature.productType.controller;

import com.agro.core.api.Api;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.dtos.getAll.GetProductTypeMapper;
import com.agro.feature.productType.dtos.getAll.GetProductTypeResponseDTO;
import com.agro.feature.productType.dtos.response.ProductTypeResponseDTO;
import com.agro.feature.productType.services.ProductTypeService;
import com.agro.shared.annotations.role.OwnerEndpoint;
import com.agro.shared.annotations.role.VendedorOrOwnerEndpoint;
import com.agro.shared.dtos.page.PageResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(Api.PRODUCT_TYPE)
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

    @GetMapping("/with-image")
    @VendedorOrOwnerEndpoint
    @Operation(summary = "Obtener todos los tipos de productos con su imagen asociada y de la compañia del usuario logeado paginado")
    public ResponseEntity<PageResponseDTO<ProductTypeResponseDTO>> getAllWithImages(@RequestAttribute("userId") Long  userId,
                                                                                    @RequestParam(defaultValue = "0") int page,
                                                                                    @RequestParam(defaultValue = "9") int size){
        Page<ProductType> productTypes = service.getAllPaginated(userId, page, size);
        return ResponseEntity.ok(PageResponseDTO.from(productTypes.map(ProductTypeResponseDTO::fromModel)));
    }

}
