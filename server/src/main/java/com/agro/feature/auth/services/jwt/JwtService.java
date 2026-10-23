package com.agro.feature.auth.services.jwt;

import com.agro.feature.auth.services.userDetails.UserCredentials;

public interface JwtService {
    String generateAccessToken(UserCredentials credentials);
    String generateRefreshToken(UserCredentials credentials);
    Long validate(String token);
}
