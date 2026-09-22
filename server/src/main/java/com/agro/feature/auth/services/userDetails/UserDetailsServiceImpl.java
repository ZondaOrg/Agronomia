package com.agro.feature.auth.services.userDetails;

import com.agro.feature.user.contracts.UserCredentialsService;
import com.agro.shared.entities.userAuthenticate.UserAuthenticate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsAdapter {

    private UserCredentialsService userCredentialsService;

    public UserDetailsServiceImpl(UserCredentialsService userCredentialsService) {
        this.userCredentialsService = userCredentialsService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAuthenticate userAuthenticate = userCredentialsService.getCredentialsByEmail(username);
        return new UserCredentials(userAuthenticate);
    }

    @Override
    public UserDetails loadUserById(Long id) {
        UserAuthenticate userAuthenticate = userCredentialsService.getCredentialsById(id);
        return new UserCredentials(userAuthenticate);
    }
}
