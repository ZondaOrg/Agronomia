package com.agro.feature.client.contracts;

import com.agro.feature.client.domain.Client;
import com.agro.feature.client.dtos.ClientType;

import java.util.List;

public interface ClientDataService {
    List<Client> findByTypeAndName(ClientType clientType, String empresa);
}
