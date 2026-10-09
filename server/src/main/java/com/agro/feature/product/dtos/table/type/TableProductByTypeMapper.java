package com.agro.feature.product.dtos.table.type;

import com.agro.feature.product.domain.Product;
import com.agro.feature.product.domain.ProductWithProvider;
import com.agro.feature.product.dtos.table.GetterProductMapper;
import com.agro.feature.product.dtos.table.TableProductMapper;
import com.agro.feature.product.dtos.table.response.ProductRowRequestDTO;
import com.agro.feature.product.dtos.table.response.ProductRowSimpleResponse;
import com.agro.shared.dtos.table.ColumnHeaderDTO;
import com.agro.shared.dtos.table.TableResponseDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public class TableProductByTypeMapper {

    public static Page<ProductRowSimpleResponse> getProductsRows(Page<ProductWithProvider> pagesOfProducts) {
        return pagesOfProducts.map(ProductRowSimpleResponse::getProductRow);
    }


    public static List<ColumnHeaderDTO> columns() {
        return List.of(
                new ColumnHeaderDTO("product", "PRODUCTO"),
                new ColumnHeaderDTO("provider", "PROVEEDOR")
        );
    }
    public static TableResponseDTO<ProductRowSimpleResponse> modelToDto(Page<ProductWithProvider> pagesOfProducts) {
        Page<ProductRowSimpleResponse> pagesOfResponse = TableProductByTypeMapper.getProductsRows(pagesOfProducts);
        List<ColumnHeaderDTO> columns = TableProductByTypeMapper.columns();

        return TableResponseDTO.fromPage(
                columns, pagesOfResponse, ProductRowSimpleResponse::idProduct);
    }
}
