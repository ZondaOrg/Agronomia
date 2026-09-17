package com.agro.shared.dtos.table;

import org.springframework.data.domain.Page;
import java.util.List;
import java.util.function.Function;

public record TableResponseDTO<T>(
        List<ColumnHeaderDTO> columns,
        List<RowDTO<T>> rows,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last
) {
    public static <T> TableResponseDTO<T> fromPage(
            List<ColumnHeaderDTO> columns,
            Page<T> page,
            Function<T, Long> idExtractor
    ) {
        return new TableResponseDTO<>(
                columns,
                page.getContent().stream()
                        .map(item -> new RowDTO<>(idExtractor.apply(item), item))
                        .toList(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }
}