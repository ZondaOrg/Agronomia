package com.agro.feature.product.services;

import com.agro.feature.product.domain.Optional;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OptionalService {
    Page<Optional> getPagesOffOptionals(Long idProduct, Integer page, Integer size);

    List<String> getOptionalsById(List<Long> idsOptionals);
}
