package com.agro.feature.client.persistence.daos;

import com.agro.feature.client.domain.Client;
import com.agro.feature.client.dtos.ClientType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientDAO extends JpaRepository<Client, Long> {
    @Query("""
        SELECT c FROM Client c
        WHERE c.companyId = :companyId
        AND (:search IS NULL OR c.searchText LIKE CONCAT('%', :search, '%'))
        ORDER BY c.sortKey ASC
    """)
    Page<Client> searchClientByCompanyId(
            @Param("companyId") Long companyId,
            @Param("search") String search,
            Pageable pageable
    );
    boolean existsByCuit_Cuit(String cuitCuit);

    boolean existsByEmail_Email(String emailEmail);

    boolean existsByEmail_EmailAndIdNot(String emailEmail, Long id);

    @Query("""
    SELECT c FROM Client c
    WHERE (:entityClass IS NULL OR TYPE(c) = :entityClass)
    AND (:name IS NULL OR c.searchText LIKE CONCAT('%', :name, '%'))
    ORDER BY c.sortKey ASC
    """)
    List<Client> findAllByClassAndName(
            @Param("entityClass") Class<? extends Client> entityClass,
            @Param("name") String name
    );
}
