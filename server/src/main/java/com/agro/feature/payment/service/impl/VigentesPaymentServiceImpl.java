package com.agro.feature.payment.service.impl;

import com.agro.feature.payment.contracts.VigentesPaymentDataService;
import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.payment.persistence.dao.VigentesPaymentDAO;
import com.agro.feature.payment.service.VigentesPaymentService;
import com.agro.feature.provider.contracts.ProviderDataService;
import com.agro.feature.provider.domain.Provider;
import org.springframework.stereotype.Service;

@Service
public class VigentesPaymentServiceImpl implements VigentesPaymentDataService, VigentesPaymentService {

    private final VigentesPaymentDAO vigentesPaymentDAO;
    private final ProviderDataService providerDataService;

    public VigentesPaymentServiceImpl(VigentesPaymentDAO vigentesPaymentDAO, ProviderDataService providerDataService) {
        this.vigentesPaymentDAO = vigentesPaymentDAO;
        this.providerDataService = providerDataService;
    }

    @Override
    public VigentePayment getVigentePaymentsPaginatedById(Long providerId) {
        Provider provider = getProvider(providerId);
        return vigentesPaymentDAO.findByProvider(provider);
    }

    private Provider getProvider(Long providerId) {
        return providerDataService.getProviderById(providerId);
    }

    @Override
    public VigentePayment createVigentePayment(VigentePayment model, Long idProvider) {
        Provider provider = getProvider(idProvider);
        model.setProvider(provider);
        provider.setVigentePayment(model);
        if (model.getPayments() != null) {
            model.getPayments().forEach(payment -> payment.setVigentePayment(model));
        }

        return save(model);
    }

    @Override
    public VigentePayment save(VigentePayment vigentePayment) {
        return vigentesPaymentDAO.save(vigentePayment);
    }
}
