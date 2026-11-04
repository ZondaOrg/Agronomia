package com.agro.feature.auth.services.cookie;

import org.springframework.http.ResponseCookie;

public interface RefreshCookieService {
    String REFRESH_COOKIE_NAME = "refresh_token";

    ResponseCookie generateRefreshCookie(String refreshToken);
}
