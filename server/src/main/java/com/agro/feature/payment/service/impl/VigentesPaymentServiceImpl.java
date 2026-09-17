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
        Provider provider = providerDataService.getProviderById(providerId);
        return vigentesPaymentDAO.findByProvider(provider); //QUE PASA SI NO EXISTE O VIENE NULL???
    }

    @Override
    public VigentePayment save(VigentePayment vigentePayment) {
        return vigentesPaymentDAO.save(vigentePayment);
    }
}
