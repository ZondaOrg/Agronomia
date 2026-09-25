package com.agro.feature.provider.dtos.response;

import com.agro.feature.provider.domain.Provider;

import java.util.List;

public record ProviderResponseDTO(
        Long id,
        String tradeName,
        String legalName,
        String cuit,
        String phoneNumber,
        Long companyId,
        TravelerResponseDTO traveler,
        List<String> payments,
        List<Integer> listPrices
){
    public static ProviderResponseDTO fromModel(Provider provider) {
        return new ProviderResponseDTO(
                provider.getId(),
                provider.getTradeName(),
                provider.getLegalName(),
                provider.getCuit(),
                provider.getPhoneNumber(),
                provider.getCompanyId(),
                TravelerResponseDTO.fromModel(provider.getTraveler()),
                provider.getPaymentMethods(),
                List.of(1,2)
        );
    }
}