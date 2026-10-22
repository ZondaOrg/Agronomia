package com.agro.feature.client.dtos.request;

import com.agro.feature.client.dtos.ClientType;

public record ClientRequestFilterDTO(
        ClientType type,
        String name
) {
}