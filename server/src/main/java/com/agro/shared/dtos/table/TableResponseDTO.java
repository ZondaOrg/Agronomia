package com.agro.shared.dtos.table;

import com.agro.shared.dtos.page.PageInfoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.function.Function;

public record TableResponseDTO<T>(
        List<ColumnHeaderDTO> columns,
        List<RowDTO<T>> rows,
        PageInfoDTO page
) {

    private static final int DEFAULT_PAGE_SIZE = 4;

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
                PageInfoDTO.of(page)
        );
    }


    public static <S, T> TableResponseDTO<T> fromList(
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

        Page<T> pagedItems = new PageImpl<>(items, PageRequest.of(safePage, safeSize), total);

        return fromPage(columns, pagedItems, idExtractor);
    }
}