package com.agro.feature.cotizar.orchestrator.previewStep2;

import com.agro.feature.cotizar.dto.response.StepPreviewResponseDTO;
import com.agro.feature.product.domain.Optional;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.services.OptionalService;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.provider.contracts.ProviderDataService;
import com.agro.feature.provider.domain.Provider;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreviewStep2OrchestratorImpl implements PreviewStep2{
    private final ProviderDataService providerDataService;

    private final ProductService productService;

    private final OptionalService optionalService;

    public PreviewStep2OrchestratorImpl(ProviderDataService providerDataService, ProductService productService, OptionalService optionalService) {
        this.providerDataService = providerDataService;
        this.productService = productService;
        this.optionalService = optionalService;
    }

    @Override
    public StepPreviewResponseDTO getPreview(Long idProvider, Long idProduct, List<Long> idsOptionals) {
        Provider provider = providerDataService.getProviderById(idProvider);

        Product product = productService.findByIdWithinOptionals(idProduct);

        List<String> namesOptionals = optionalService.getOptionalsById(idsOptionals);

        return new StepPreviewResponseDTO(provider.getTradeName(), product.getName(), namesOptionals);
    }
}
