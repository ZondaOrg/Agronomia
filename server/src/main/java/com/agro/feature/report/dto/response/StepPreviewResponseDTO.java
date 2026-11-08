package com.agro.feature.report.dto.response;

import com.agro.feature.payment.domain.Payment;

import java.util.List;

public record StepPreviewResponseDTO(
        String nameProvider,
        String nameProduct,
        List<String> nameOptionals,
        List<PaymentResponseDTO> vigentePayment) {

    public static StepPreviewResponseDTO fromModel(String tradeName, String name, List<String> namesOptionals, List<Payment> payments) {
        return new StepPreviewResponseDTO(tradeName, name, namesOptionals, payments.stream().map(PaymentResponseDTO::fromModel).toList());
    }
}
