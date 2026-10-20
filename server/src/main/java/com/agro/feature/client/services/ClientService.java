package com.agro.feature.client.services;

import com.agro.feature.client.domain.Client;
import com.agro.feature.client.dtos.ClientType;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ClientService {
    Client save(Client client, Long userId);
    Client update(Client client);
    Page<Client> getClients(int page, int size, Long userId, String name);

    Client findById(Long clientId);


}
