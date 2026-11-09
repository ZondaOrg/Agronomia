package com.agro.feature.provider.service;

import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.persistence.projections.SearchProviderProjection;

import java.util.List;

public interface ProviderService {
    Provider save(Provider provider);

    List<SearchProviderProjection> search(Long userId, String search);
}
