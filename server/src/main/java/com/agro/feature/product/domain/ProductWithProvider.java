package com.agro.feature.product.domain;

public record ProductWithProvider (
        Long idProduct,
        String name,
        String nameProvider
) {}
