package com.agro.feature.payment.dto.response;

import com.agro.feature.payment.domain.VigentePayment;
import com.agro.shared.annotations.format.FormattedDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.jspecify.annotations.Nullable;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public record VigentPaymentsResponseSimpleDTO(
        Long id,
        String nameList,
        @FormattedDate
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
