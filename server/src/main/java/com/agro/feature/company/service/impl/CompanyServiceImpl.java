package com.agro.feature.company.service.impl;

import com.agro.feature.company.contracts.CompanyDataService;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.domain.exceptions.IsNotAOwnerOfCompany;
import com.agro.feature.company.persistence.daos.CompanyDAO;
import com.agro.feature.company.service.CompanyService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Supplier;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService, CompanyDataService {

    private final CompanyDAO dao;

    public CompanyServiceImpl(CompanyDAO dao) {
        this.dao = dao;
    }

    @Override
    public Company getCompanyById(Long idCompany) {
        return execute(() -> dao.findById(idCompany));
    }

    private boolean includeUser(Long companyId, Long adminId) {
        return dao.existsByIdAndUsers_Id(companyId, adminId);
    }

    @Override
    public Company getCompanyByUserId(Long idUser) {
        return execute(() -> dao.findByUsers_Id(idUser));
    }

    @Override
    public Company editCompany(Long adminId, Company model, Long idCompany) {
        if(!this.includeUser(idCompany, adminId)) throw new IsNotAOwnerOfCompany();

        Company company = this.getCompanyById(idCompany);

        company.update(model);

        return this.save(company);
    }


    private Company execute(Supplier<Optional<Company>> query){
        return query.get().orElseThrow(() -> new EntityNotFoundException("Entidad no encontrada"));
    }

    @Override
    public Company save(Company company) {
        return dao.save(company);
    }
}
