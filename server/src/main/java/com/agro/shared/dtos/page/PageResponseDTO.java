package com.agro.shared.dtos.page;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.domain.Page;

import java.util.List;

@Schema(description = "Respuesta paginada genérica")
public record PageResponseDTO<T>(

        @Schema(description = "Lista de elementos de la página actual")
        List<T> content,

        @Schema(description = "Número de página actual (base 0)", example = "0")
        int page,

        @Schema(description = "Cantidad de elementos por página", example = "20")
        int size,

        @Schema(description = "Total de elementos en el sistema", example = "100")
        long totalElements,

        @Schema(description = "Total de páginas disponibles", example = "5")
        int totalPages,

        @Schema(description = "Indica si es la última página", example = "false")
        boolean last

) {

    public static <T> PageResponseDTO<T> from(Page<T> page) {
        return new PageResponseDTO<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}
