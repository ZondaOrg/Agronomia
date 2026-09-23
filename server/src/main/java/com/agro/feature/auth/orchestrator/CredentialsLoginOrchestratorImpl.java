package com.agro.feature.auth.orchestrator;

import com.agro.feature.auth.domain.Auth;
import com.agro.feature.auth.dtos.request.Credentials;
import com.agro.feature.auth.services.authentication.LoginService;
import com.agro.feature.auth.services.jwt.JwtService;
import com.agro.feature.auth.services.userDetails.UserCredentials;
import org.springframework.stereotype.Service;

@Service
public class CredentialsLoginOrchestratorImpl implements LoginOrchestrator {

    private LoginService authService;
    private JwtService jwtService;

    public CredentialsLoginOrchestratorImpl(LoginService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @Override
    public Auth login(Credentials credentials) {
        UserCredentials userCredentials = authService.login(credentials);
        String token = jwtService.generate(userCredentials);
        return new Auth(
                userCredentials.getName(),
                userCredentials.getSurname(),
                userCredentials.getEmail(),
                userCredentials.getRole(),
                token,
                userCredentials.getId(),
                userCredentials.getLogo()
        );
    }
}
