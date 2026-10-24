package com.agro.feature.auth.orchestrator.session;

import com.agro.feature.auth.domain.Auth;
import com.agro.feature.auth.services.cookie.RefreshCookieService;
import com.agro.feature.auth.services.jwt.JwtService;
import com.agro.feature.user.contracts.UserCredentialsService;
import com.agro.shared.entities.userAuthenticate.UserAuthenticate;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class SessionOrchestratorImpl implements SessionOrchestrator {

    private UserCredentialsService userService;
    private JwtService jwtService;
    private RefreshCookieService cookieService;

    public SessionOrchestratorImpl(UserCredentialsService userService, JwtService jwtService, RefreshCookieService cookieService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.cookieService = cookieService;
    }

    @Override
    public Auth refresh(Long userId) {
        UserAuthenticate user = userService.getCredentialsById(userId);
        String accessToken = jwtService.generateAccessToken(userId);
        String refreshToken = jwtService.generateRefreshToken(userId);
        ResponseCookie refreshCookie = cookieService.generateRefreshCookie(refreshToken);
        return new Auth(
                user.name(),
                user.surname(),
                user.email(),
                user.role(),
                accessToken,
                refreshCookie,
                user.id(),
                user.logo()
        );
    }
}
