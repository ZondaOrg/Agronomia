package com.agro.feature.provider.contracts;

import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.dtos.request.ProviderEditRequestDTO;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

public interface ProviderDataService {
    Page<Provider> getProviders(int page, int size, Long userId, String name);

    Provider addProvider(Long userId, Provider model);

    Provider editProvider(Long userId, Provider request);

    Provider getProviderById(Long providerId);

    Boolean existProvider(Long providerId);

}
