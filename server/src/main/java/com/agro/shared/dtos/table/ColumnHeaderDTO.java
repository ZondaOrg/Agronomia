package com.agro.shared.dtos.table;


public record ColumnHeaderDTO(
        String key,
        String header
) {

    public static ColumnHeaderDTO of(String key, String header) {
        return new ColumnHeaderDTO(key, header);
    }
}