package com.agro.feature.company.persistence.daos;

import com.agro.feature.company.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyDAO extends JpaRepository<Company, Long> {
    Optional<Company> findFirstByCuit(String cuit);

    Optional<Company> findByUsers_Id(Long idUser);


    boolean existsByIdAndUsers_Id(Long companyId, Long adminId);
}
