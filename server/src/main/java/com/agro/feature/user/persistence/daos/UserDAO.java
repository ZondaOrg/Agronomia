package com.agro.feature.user.persistence.daos;

import com.agro.feature.user.domain.User;
import com.agro.shared.valueObjects.email.EmailValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u where u.email.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    boolean existsByEmail(EmailValue email);

    Page<User> findAllByCompany_Id(Long companyId, Pageable pageable);
}
