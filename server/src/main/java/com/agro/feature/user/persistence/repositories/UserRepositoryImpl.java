package com.agro.feature.user.persistence.repositories;

import com.agro.feature.user.domain.User;
import com.agro.feature.user.domain.exceptions.UserNotFoundException;
import com.agro.feature.user.persistence.daos.UserDAO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {
    private UserDAO userDao;

    public UserRepositoryImpl(UserDAO userDao) {
        this.userDao = userDao;
    }

    @Override
    public User save(User user) {
        return userDao.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userDao.findByEmail(email).orElseThrow(() -> new UserNotFoundException(notFoundUserMessage(email)));
    }

    private String notFoundUserMessage(String email) {
        return "No se encontro al usuario con el mail " + email;
    }
}
