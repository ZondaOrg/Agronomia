package com.agro.feature.provider.persistence;

import com.agro.feature.provider.domain.Provider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProviderDAO extends JpaRepository<Provider, Long> {
    Page<Provider> findAllByCompanyId(Long companyId, PageRequest pageRequest);

    List<Provider> findAllByCompanyId(Long companyId);

    @Query("""
        FROM Provider p
        WHERE p.companyId = :companyId
        AND (LOWER(p.tradeName) LIKE LOWER(CONCAT('%', :search, '%'))
             OR LOWER(p.legalName) LIKE LOWER(CONCAT('%', :search, '%')))
        ORDER BY p.tradeName ASC, p.legalName ASC
    """)
    Page<Provider> searchByCompanyId(
            @Param("companyId") Long companyId,
            @Param("search") String search,
            Pageable pageable
    );

    boolean existsByCuit_Cuit(String cuitCuit);

    boolean existsByCuit_CuitAndCompanyId(String cuitCuit, Long companyId);
}
