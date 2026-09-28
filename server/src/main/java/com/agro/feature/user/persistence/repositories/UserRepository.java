package com.agro.feature.user.persistence.repositories;

import com.agro.feature.user.domain.User;

public interface UserRepository {
    User save(User user);

    User findByEmail(String email);
}
