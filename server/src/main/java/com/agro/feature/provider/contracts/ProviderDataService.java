package com.agro.feature.provider.contracts;

import com.agro.feature.provider.domain.Provider;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProviderDataService {
    Page<Provider> getProviders(int page, int size, Long userId, String name);

    Provider addProvider(Long userId, Provider model);

    Provider editProvider(Long userId, Provider request);

    Provider getProviderById(Long providerId);

    Boolean existProvider(Long providerId);

    void addProduct(Long idProvider, Long idProduct);

    List<Provider> getProvidersByCompany(Long idCompany);
}
