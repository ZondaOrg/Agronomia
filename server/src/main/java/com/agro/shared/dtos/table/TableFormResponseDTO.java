package com.agro.shared.dtos.table;

import java.util.List;
import java.util.function.Function;

public record TableFormResponseDTO<T>(
        List<ColumnHeaderDTO> columns,
        List<RowDTO<T>> rows
) {

    public static <T> TableFormResponseDTO<T> fromList(
            List<ColumnHeaderDTO> columns,
            List<T> items,
            Function<T, Long> idExtractor
    ) {
        return new TableFormResponseDTO<>(
                columns,
                items.stream()
                        .map(item -> new RowDTO<>(idExtractor.apply(item), item))
                        .toList()
        );
    }
}