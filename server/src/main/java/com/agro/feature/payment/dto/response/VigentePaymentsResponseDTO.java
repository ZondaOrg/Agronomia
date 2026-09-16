package com.agro.feature.payment.dto.response;

import com.agro.feature.payment.domain.VigentePayment;
import com.agro.shared.dtos.table.ColumnHeaderDTO;
import com.agro.shared.dtos.table.TableFormResponseDTO;
import org.jspecify.annotations.Nullable;

import java.util.List;

public record VigentePaymentsResponseDTO(
        Long id,
        String nameList,
        TableFormResponseDTO<PaymentResponseDTO> payments
) {
    public static @Nullable VigentePaymentsResponseDTO fromModel(VigentePayment vigente, List<ColumnHeaderDTO> columns) {
        List<PaymentResponseDTO> payments = vigente.getPayments().stream().map(PaymentResponseDTO::fromModel).toList();

        return new VigentePaymentsResponseDTO(
            vigente.getId(),
            vigente.getNameList(),
            TableFormResponseDTO.fromList(columns, payments, PaymentResponseDTO::id)
        );
    }
}
