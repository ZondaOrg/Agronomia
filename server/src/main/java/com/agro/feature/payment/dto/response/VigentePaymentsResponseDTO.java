package com.agro.feature.payment.dto.response;

import com.agro.feature.payment.domain.VigentePayment;
import com.agro.shared.dtos.table.ColumnHeaderDTO;
import com.agro.shared.dtos.table.TableResponseDTO;
import org.jspecify.annotations.Nullable;

import java.util.List;

public record VigentePaymentsResponseDTO(
        Long id,
        String nameList,
        TableResponseDTO<PaymentResponseDTO> payments
) {

    public static @Nullable VigentePaymentsResponseDTO fromModel(
            VigentePayment vigente,
            List<ColumnHeaderDTO> columns,
            int page,
            int size
    ) {
        if (vigente == null) return null;

        return new VigentePaymentsResponseDTO(
                vigente.getId(),
                vigente.getNameList(),
                TableResponseDTO.fromList(
                        columns,
                        vigente.getPayments(),
                        PaymentResponseDTO::fromModel,
                        PaymentResponseDTO::id,
                        page,
                        size
                )
        );
    }
}