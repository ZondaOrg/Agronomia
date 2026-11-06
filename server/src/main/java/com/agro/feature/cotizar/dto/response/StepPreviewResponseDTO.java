package com.agro.feature.cotizar.dto.response;

import com.agro.feature.payment.domain.Payment;
import com.agro.feature.payment.domain.VigentePayment;

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
