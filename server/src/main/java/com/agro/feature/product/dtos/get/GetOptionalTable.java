package com.agro.feature.product.dtos.get;

import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.dtos.OptionalResponseDTO;
import com.agro.shared.dtos.table.ColumnHeaderDTO;
import com.agro.shared.dtos.table.TableResponseDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public class GetOptionalTable {

    private static List<ColumnHeaderDTO> columns() {
        return List.of(
                new ColumnHeaderDTO("name", "NOMBRE DEL OPCIONAL"),
                new ColumnHeaderDTO("price", "PRECIO LISTA")
        );
    }

    public static TableResponseDTO<OptionalResponseDTO> modelsToDto(Page<Optional> pageOffOptionals) {
        return TableResponseDTO.fromPage(
                columns(),
                GetOptionalMapper.modelsToDto(pageOffOptionals),
                OptionalResponseDTO::id
        );
    }
}
