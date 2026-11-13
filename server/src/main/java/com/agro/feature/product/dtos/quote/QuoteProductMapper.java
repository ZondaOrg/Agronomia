package com.agro.feature.product.dtos.quote;

import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.OptionalResponseDTO;
import com.agro.feature.product.dtos.quote.response.QuoteProductResponse;

import java.util.List;

public class QuoteProductMapper {

    public static QuoteProductResponse toResponse(Product product) {
        List<OptionalResponseDTO> optionals = product.getOptionals().stream()
                .map(QuoteProductMapper::toOptionalResponse)
                .toList();
        return new QuoteProductResponse(
                product.getId(),
                product.getName(),
                product.getMoney(),
                product.getListPrice(),
                product.getIva(),
                product.getFreight(),
                optionals
        );
    }

    static OptionalResponseDTO toOptionalResponse(Optional optional) {
        return new OptionalResponseDTO(
                optional.getId(),
                optional.getName(),
                optional.getPrice()
        );
    }
}
