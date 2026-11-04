package com.agro.feature.auth.services.cookie;

import com.agro.core.api.Api;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RefreshCookieServiceImpl implements RefreshCookieService {

    @Override
    public ResponseCookie generateRefreshCookie(String refreshToken) {
        return ResponseCookie.from(REFRESH_COOKIE_NAME, refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/" + Api.SESSION)
                .maxAge(Duration.ofHours(8))
                .sameSite("Strict")
                .build();
    }
}
