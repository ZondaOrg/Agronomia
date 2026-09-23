package com.agro.feature.product.dtos.add;

import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.add.request.AddedOptionalRequest;

import java.util.Set;
import java.util.stream.Collectors;

public class AddedOptionalsMapper {
    public static Product dtosToModels(Product product, Set<AddedOptionalRequest> optionals) {
        optionals.stream().
                map(optional ->
                        dtoToModel(product, optional)).collect(Collectors.toSet());
        return product;
    }

    public static Optional dtoToModel(Product product, AddedOptionalRequest optional) {
        return new Optional(product, optional.name(), optional.price());
    }
}
