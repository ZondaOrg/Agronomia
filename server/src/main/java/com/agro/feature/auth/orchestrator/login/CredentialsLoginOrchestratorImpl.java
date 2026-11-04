package com.agro.feature.auth.orchestrator.login;

import com.agro.feature.auth.domain.Auth;
import com.agro.feature.auth.dtos.request.Credentials;
import com.agro.feature.auth.services.authentication.LoginService;
import com.agro.feature.auth.services.cookie.RefreshCookieService;
import com.agro.feature.auth.services.jwt.JwtService;
import com.agro.feature.auth.services.userDetails.UserCredentials;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
public class CredentialsLoginOrchestratorImpl implements LoginOrchestrator {

    private LoginService authService;
    private JwtService jwtService;
    private RefreshCookieService cookieService;

    public CredentialsLoginOrchestratorImpl(LoginService authService, JwtService jwtService, RefreshCookieService cookieService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.cookieService = cookieService;
    }

    @Override
    public Auth login(Credentials credentials) {
        UserCredentials userCredentials = authService.login(credentials);
        String accessToken = jwtService.generateAccessToken(userCredentials.getId());
        String refreshToken = jwtService.generateRefreshToken(userCredentials.getId());
        ResponseCookie refreshCookie = cookieService.generateRefreshCookie(refreshToken);
        return new Auth(
                userCredentials.getName(),
                userCredentials.getSurname(),
                userCredentials.getEmail(),
                userCredentials.getRole(),
                accessToken,
                refreshCookie,
                userCredentials.getId(),
                userCredentials.getLogo()
        );
    }
}
