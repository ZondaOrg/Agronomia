package com.agro.feature.provider.service.impl;

import com.agro.feature.provider.contracts.ProviderDataService;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.persistence.ProviderDAO;
import com.agro.feature.provider.service.ProviderService;
import com.agro.feature.user.contracts.UserDataService;
import com.agro.feature.user.domain.User;
import com.agro.shared.valueObjects.cuit.CuitDuplicatedException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProviderServiceImpl implements ProviderService, ProviderDataService {

    private final ProviderDAO providerDAO;

    private final UserDataService userDataService;

    public ProviderServiceImpl(ProviderDAO providerDAO, UserDataService userDataService) {
        this.providerDAO = providerDAO;
        this.userDataService = userDataService;
    }

    @Override
    public Page<Provider> getProviders(int page, int size, Long userId, String name) {
        User user = userDataService.getUserById(userId);
        return providerDAO.searchByCompanyId(user.getCompany().getId(),name, PageRequest.of(page, size));
    }

    @Override
    public Provider addProvider(Long userId, Provider model) {
        User user = userDataService.getUserById(userId);

        if (providerDAO.existsByCuit_CuitAndCompanyId(model.getCuit(), user.getCompany().getId())){
            throw new CuitDuplicatedException(model.getCuit());
        }

        model.setCompanyId(user.getCompany().getId());
        return this.save(model);
    }

    @Override
    public Provider editProvider(Long userId, Provider provider) {
        Provider recovered = getProviderById(provider.getId());
        recovered.update(provider);
        return recovered;
    }

    @Override
    public Provider getProviderById(Long providerId) {
        return providerDAO.findById(providerId).orElseThrow(() -> new EntityNotFoundException("No se encontro el proveedor"));
    }

    @Override
    public Boolean existProvider(Long providerId) {
        return providerDAO.existsById(providerId);
    }

    @Override
    public Provider save(Provider provider) {
        return providerDAO.save(provider);
    }
}
