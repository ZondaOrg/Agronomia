package com.agro.feature.product.dtos.getComplete;

import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.getComplete.response.ProductRowRequestDTO;
import com.agro.shared.dtos.table.ColumnHeaderDTO;
import com.agro.shared.dtos.table.TableResponseDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public class TableProductMapper {

    public static Page<ProductRowRequestDTO> getProductsRows(Page<Product> pagesOfProducts) {
        return pagesOfProducts.map(GetterProductMapper::getProductRow);
    }

    public static List<ColumnHeaderDTO> columns() {
        return List.of(
                new ColumnHeaderDTO("id", "ID"),
                new ColumnHeaderDTO("name", "NOMBRE"),
                new ColumnHeaderDTO("money", "MONEDA"),
                new ColumnHeaderDTO("listPrice", "PRECIO LISTA"),
                new ColumnHeaderDTO("bonification", "BONIFICACIÓN"),
                new ColumnHeaderDTO("freight", "VALOR FLETE"),
                new ColumnHeaderDTO("iva", "IVA")
        );
    }

    public static TableResponseDTO<ProductRowRequestDTO> modelToDto(Page<Product> pagesOfProducts) {
        Page<ProductRowRequestDTO> pagesOfResponse = TableProductMapper.getProductsRows(pagesOfProducts);

        List<ColumnHeaderDTO> columns = TableProductMapper.columns();

        return TableResponseDTO.fromPage(
                columns, pagesOfResponse, ProductRowRequestDTO::id);
    }
}
