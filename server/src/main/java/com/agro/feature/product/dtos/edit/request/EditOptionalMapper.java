package com.agro.feature.product.dtos.edit.request;

import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.dtos.add.request.AddedOptionalRequest;

import java.util.List;

public class EditOptionalMapper {
    public static List<Optional> dtosToModels(List<AddedOptionalRequest> request, Product product) {
        return request.stream().map(optional -> dtoToModel(optional, product)).toList();
    }
    public static Optional dtoToModel(AddedOptionalRequest optional, Product product) {
        return new Optional(product, optional.name(), optional.price());
    }
}
