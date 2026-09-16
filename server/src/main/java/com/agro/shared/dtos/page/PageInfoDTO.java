package com.agro.shared.dtos.page;

public record PageInfoDTO(
        int page,
        int size,
        int totalElements,
        int totalPages,
        boolean first,
        boolean last
) {
    public static PageInfoDTO of(int page, int size, int totalElements) {
        int totalPages = size <= 0 ? 0 : (int) Math.ceil((double) totalElements / size);
        return new PageInfoDTO(
                page,
                size,
                totalElements,
                totalPages,
                page == 0,
                totalPages == 0 || page >= totalPages - 1
        );
    }
}