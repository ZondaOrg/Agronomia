package com.agro.feature.auth.controllers;

import com.agro.core.api.Api;
import com.agro.feature.auth.domain.Auth;
import com.agro.feature.auth.dtos.AuthMapper;
import com.agro.feature.auth.dtos.response.AuthResponse;
import com.agro.feature.auth.orchestrator.session.SessionOrchestrator;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Api.SESSION)
public class SessionControllerREST {

    private SessionOrchestrator orchestrator;

    public SessionControllerREST(SessionOrchestrator orchestrator) {
        this.orchestrator = orchestrator;
    }

    @PostMapping(Api.REFRESH)
    public ResponseEntity<AuthResponse> refresh(@RequestAttribute("userId") Long userId) {
        Auth auth = orchestrator.refresh(userId);

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + auth.accessToken())
                .header(HttpHeaders.SET_COOKIE, auth.refreshCookie().toString())
                .body(AuthMapper.INSTANCE.modelToDto(auth));
    }
}
