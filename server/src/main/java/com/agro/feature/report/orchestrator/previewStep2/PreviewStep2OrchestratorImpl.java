package com.agro.feature.report.orchestrator.previewStep2;

import com.agro.feature.report.dto.response.StepPreviewResponseDTO;
import com.agro.feature.payment.contracts.VigentesPaymentDataService;
import com.agro.feature.payment.domain.Payment;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.services.OptionalService;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.provider.contracts.ProviderDataService;
import com.agro.feature.provider.domain.Provider;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreviewStep2OrchestratorImpl implements PreviewStep3 {
    private final ProviderDataService providerDataService;

    private final ProductService productService;

    private final OptionalService optionalService;

    private final VigentesPaymentDataService vigentesPaymentDataService;

    public PreviewStep2OrchestratorImpl(ProviderDataService providerDataService, ProductService productService, OptionalService optionalService, VigentesPaymentDataService vigentesPaymentDataService) {
        this.providerDataService = providerDataService;
        this.productService = productService;
        this.optionalService = optionalService;
        this.vigentesPaymentDataService = vigentesPaymentDataService;
    }

    @Override
    public StepPreviewResponseDTO getPreview(Long idProvider, Long idProduct, List<Long> idsOptionals) {
        Provider provider = providerDataService.getProviderById(idProvider);

        Product product = productService.findByIdWithinOptionals(idProduct);

        List<String> namesOptionals = optionalService.getOptionalsById(idsOptionals);

        List<Payment> payments = vigentesPaymentDataService.getPayments(idProvider);

        return StepPreviewResponseDTO.fromModel(provider.getTradeName(), product.getName(), namesOptionals, payments);
    }
}
