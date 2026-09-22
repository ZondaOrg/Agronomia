package com.agro.feature.user.services;

import com.agro.feature.user.contracts.UserCredentialsService;
import com.agro.feature.user.contracts.UserDataService;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.persistence.daos.UserDAO;
import com.agro.shared.entities.userAuthenticate.UserAuthenticate;
import com.agro.shared.persistence.excepitons.NotFoundEntityException;
import com.agro.shared.valueObjects.email.EmailValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserCredentialsService, UserDataService {
    private UserDAO userDao;
    private PasswordEncoder encoder;

    public UserServiceImpl(UserDAO userDao, PasswordEncoder encoder) {
        this.userDao = userDao;
        this.encoder = encoder;
    }

    @Override
    public UserAuthenticate getCredentialsByEmail(String email) {
        User user = userDao.findByEmail(email).orElseThrow(() -> new NotFoundEntityException("Entidad no encontrada"));
        return new UserAuthenticate(
                user.getEmail(),
                user.getPassword(),
                user.getRole(),
                user.getName(),
                user.getSurname(),
                user.getLogo(),
                user.getId()
        );
    }

    @Override
    public UserAuthenticate getCredentialsById(Long id) {
        User user = userDao.findById(id).orElseThrow(() -> new NotFoundEntityException("Entidad no encontrada"));
        return new UserAuthenticate(
                user.getEmail(),
                user.getPassword(),
                user.getRole(),
                user.getName(),
                user.getLogo(),
                user.getSurname(),
                user.getId()
        );
    }

    @Override
    public User save(User user) {
        String encrypted = encoder.encode(user.getPassword());
        user.addEncriptedPassword(encrypted);
        return userDao.save(user);
    }

    @Override
    public Page<User> findAll(int page, int size, Long adminId) {
        User user = getUserById(adminId);
        return userDao.findAllByCompany_Id(user.getCompany().getId(), PageRequest.of(page, size));
    }

    @Override
    public boolean existsByEmail(String email) {
        return userDao.existsByEmail(new EmailValue(email));
    }

    @Override
    public User getUserById(Long id) {
        return userDao.findById(id).orElseThrow(() -> new NotFoundEntityException("Usuario no encontrada"));
    }

    public void clearAll() {
        userDao.deleteAll();
    }
}
