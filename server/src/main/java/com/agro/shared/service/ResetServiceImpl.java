package com.agro.shared.service;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ResetServiceImpl implements ResetService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void resetAll() {
        resetSQL();
    }

    private void resetSQL() {

        List<String> tablasExistentes = List.of(
                "users",
                "clients",
                "providers",
                "companys",
                "branches",
                "vigent_payments",
                "payment",
                "products",
                "product_types"
        );

        String sql = "TRUNCATE TABLE " +
                tablasExistentes.stream().collect(Collectors.joining(", ")) +
                " CASCADE";

        entityManager.createNativeQuery(sql).executeUpdate();
    }
}