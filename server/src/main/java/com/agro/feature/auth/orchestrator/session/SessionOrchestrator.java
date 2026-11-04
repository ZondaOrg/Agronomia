package com.agro.feature.auth.orchestrator.session;

import com.agro.feature.auth.domain.Auth;

public interface SessionOrchestrator {
    Auth refresh(Long userId);
}
