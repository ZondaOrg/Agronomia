package com.agro.feature.auth.controllers;

import com.agro.core.api.Api;
import com.agro.feature.auth.domain.Auth;
import com.agro.feature.auth.dtos.AuthMapper;
import com.agro.feature.auth.dtos.request.Credentials;
import com.agro.feature.auth.dtos.response.AuthResponse;
import com.agro.feature.auth.orchestrator.login.LoginOrchestrator;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequestMapping(Api.AUTH)
public class AuthControllerREST {

    private LoginOrchestrator orchestrator;

    public AuthControllerREST(LoginOrchestrator orchestrator) {
        this.orchestrator = orchestrator;
    }

    @PostMapping(Api.LOGIN)
    public ResponseEntity<AuthResponse> login(@RequestBody Credentials credentials) {
        Auth auth = orchestrator.login(credentials);
        ResponseCookie cookie = ResponseCookie.from("refresh_token", auth.refreshToken())
                .httpOnly(true)
                .secure(true)
                .path(Api.SESSION)
                .maxAge(Duration.ofHours(8))
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + auth.accessToken())
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(AuthMapper.INSTANCE.modelToDto(auth));
    }
}
