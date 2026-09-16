package com.agro.shared.dtos.table;

import com.agro.shared.dtos.page.PageInfoDTO;

import java.util.List;
import java.util.function.Function;

public record TableFormResponseDTO<T>(
        List<ColumnHeaderDTO> columns,
        List<RowDTO<T>> rows,
        PageInfoDTO page
) {

    public static final int DEFAULT_PAGE_SIZE = 4;

    public static <T> TableFormResponseDTO<T> fromList(
            List<ColumnHeaderDTO> columns,
            List<T> items,
            Function<T, Long> idExtractor
    ) {
        return new TableFormResponseDTO<>(columns, toRows(items, idExtractor), null);
    }

    public static <S, T> TableFormResponseDTO<T> fromPagedList(
            List<ColumnHeaderDTO> columns,
            List<S> source,
            Function<S, T> mapper,
            Function<T, Long> idExtractor,
            int page,
            int size
    ) {
        List<S> safeSource = source == null ? List.of() : source;
        int safeSize = size <= 0 ? DEFAULT_PAGE_SIZE : size;
        int safePage = Math.max(page, 0);

        int total = safeSource.size();
        int from = Math.min(safePage * safeSize, total);
        int to = Math.min(from + safeSize, total);

        List<T> items = safeSource.subList(from, to).stream()
                .map(mapper)
                .toList();

        return new TableFormResponseDTO<>(
                columns,
                toRows(items, idExtractor),
                PageInfoDTO.of(safePage, safeSize, total)
        );
    }

    private static <T> List<RowDTO<T>> toRows(List<T> items, Function<T, Long> idExtractor) {
        return items.stream()
                .map(item -> new RowDTO<>(idExtractor.apply(item), item))
                .toList();
    }
}