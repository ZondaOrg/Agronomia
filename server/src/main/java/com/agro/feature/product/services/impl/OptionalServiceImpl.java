package com.agro.feature.product.services.impl;

import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.persistence.dao.OptionalDAO;
import com.agro.feature.product.services.OptionalService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class OptionalServiceImpl implements OptionalService {

    private OptionalDAO dao;

    public OptionalServiceImpl(OptionalDAO dao) {
        this.dao = dao;
    }

    @Override
    public Page<Optional> getPagesOffOptionals(Long idProduct, Integer page, Integer size) {
        return dao.findByProductId(idProduct, PageRequest.of(page, size));
    }
}
