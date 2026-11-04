package com.agro.feature.client.services.impl;

import com.agro.feature.client.contracts.ClientDataService;
import com.agro.feature.client.domain.Client;
import com.agro.feature.client.domain.NaturalPerson;
import com.agro.feature.client.domain.RazonSocial;
import com.agro.feature.client.dtos.ClientType;
import com.agro.feature.client.persistence.daos.ClientDAO;
import com.agro.feature.client.services.ClientService;
import com.agro.feature.user.contracts.UserDataService;
import com.agro.feature.user.domain.User;
import com.agro.shared.persistence.excepitons.NormaliceText;
import com.agro.shared.valueObjects.cuit.CuitDuplicatedException;
import com.agro.shared.valueObjects.email.EmailDuplicatedException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ClientServiceImpl implements ClientService, ClientDataService {

    private ClientDAO dao;
    private UserDataService userDataService;

    public ClientServiceImpl(ClientDAO dao, UserDataService userDataService) {
        this.dao = dao;
        this.userDataService = userDataService;
    }

    @Override
    public Client save(Client client, Long userId) {
        if(dao.existsByCuit_Cuit(client.getCuit())) throw new CuitDuplicatedException(client.getCuit());

        User user = userDataService.getUserById(userId);

        client.setCompanyId(user.getCompany().getId());

        return dao.save(client);
    }

    @Override
    public Client update(Client client) {
        if (client.getEmail() != null
                && !client.getEmail().isBlank()
                && dao.existsByEmail_EmailAndIdNot(client.getEmail(), client.getId())) {
            throw new EmailDuplicatedException(client.getEmail());
        }
        return dao.save(client);
    }

    @Override
    public Page<Client> getClients(int page, int size, Long userId, String name) {
        User user = userDataService.getUserById(userId);
        String normaliceSearch = NormaliceText.normalize(name);
        return dao.searchClientByCompanyId(user.getCompany().getId(), normaliceSearch, PageRequest.of(page, size));
    }

    @Override
    public Client findById(Long id) {
        return dao.findById(id).orElseThrow(() -> new EntityNotFoundException("El cliente con id " + id + " no fue encontrado"));
    }

    public List<Client> findByTypeAndName(ClientType clientType, String name) {
        Class<? extends Client> entityClass = null;
        if (clientType != null) {
            entityClass = switch (clientType) {
                case RAZON_SOCIAL -> RazonSocial.class;
                case NATURAL_PERSON -> NaturalPerson.class;
            };
        }

        String normalizedSearch = (name != null && !name.isBlank())
                ? NormaliceText.normalize(name)
                : null;

        return dao.findAllByClassAndName(entityClass, normalizedSearch);
    }
}
