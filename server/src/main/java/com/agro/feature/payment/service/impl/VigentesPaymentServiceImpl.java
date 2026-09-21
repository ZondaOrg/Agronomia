package com.agro.feature.payment.service.impl;

import com.agro.feature.payment.contracts.VigentesPaymentDataService;
import com.agro.feature.payment.domain.VigentePayment;
import com.agro.feature.payment.persistence.dao.PaymentDAO;
import com.agro.feature.payment.persistence.dao.VigentesPaymentDAO;
import com.agro.feature.payment.service.VigentesPaymentService;
import com.agro.feature.provider.contracts.ProviderDataService;
import com.agro.feature.provider.domain.Provider;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class VigentesPaymentServiceImpl implements VigentesPaymentDataService, VigentesPaymentService {

    private final VigentesPaymentDAO vigentesPaymentDAO;
    private final ProviderDataService providerDataService;
    private final PaymentDAO  paymentDAO;

    public VigentesPaymentServiceImpl(VigentesPaymentDAO vigentesPaymentDAO, ProviderDataService providerDataService, PaymentDAO paymentDAO) {
        this.vigentesPaymentDAO = vigentesPaymentDAO;
        this.providerDataService = providerDataService;
        this.paymentDAO = paymentDAO;
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
    public VigentePayment updateVigent(Long vigentId, List<Long> deletePayments, VigentePayment model) {
        VigentePayment vigent = getVigentById(vigentId);

        vigent.update(model);

        if (deletePayments != null && !deletePayments.isEmpty()) {
            paymentDAO.softDeleteByIds(deletePayments);
        }

        if (model.getPayments() != null) {
            model.getPayments().forEach(payment -> payment.setVigentePayment(vigent));
        }


        return save(vigent);
    }

    private VigentePayment getVigentById(Long vigentId) {
        return vigentesPaymentDAO.findById(vigentId).orElseThrow(() -> new EntityNotFoundException("No se encontro el metodo de pago"));
    }

    @Override
    public VigentePayment save(VigentePayment vigentePayment) {
        return vigentesPaymentDAO.save(vigentePayment);
    }
}
