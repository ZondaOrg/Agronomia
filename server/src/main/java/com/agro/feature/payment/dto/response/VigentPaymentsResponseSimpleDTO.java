package com.agro.feature.payment.dto.response;

import com.agro.feature.payment.domain.VigentePayment;
import org.jspecify.annotations.Nullable;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public record VigentPaymentsResponseSimpleDTO(
        Long id,
        String nameList,
        LocalDateTime updateAt,
        List<PaymentResponseDTO> payments
) {
    public static @Nullable VigentPaymentsResponseSimpleDTO fromModel(VigentePayment vigent) {
        return new VigentPaymentsResponseSimpleDTO(
                vigent.getId(),
                vigent.getNameList(),
                vigent.getUpdateAt(),
                vigent.getPayments().stream().map(PaymentResponseDTO::fromModel).toList()
        );
    }
}
