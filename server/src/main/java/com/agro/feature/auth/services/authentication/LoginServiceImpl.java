package com.agro.feature.auth.services.authentication;

import com.agro.feature.auth.dtos.request.Credentials;
import com.agro.feature.auth.services.userDetails.UserCredentials;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    private AuthenticationManager manager;

    public LoginServiceImpl(AuthenticationManager manager) {
        this.manager = manager;
    }

    @Override
    public UserCredentials login(Credentials credentials) {
        Authentication token = new UsernamePasswordAuthenticationToken(credentials.email(), credentials.password());
        Authentication authentication = manager.authenticate(token);
        return (UserCredentials) authentication.getPrincipal();
    }
}
