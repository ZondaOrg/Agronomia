package com.agro.feature.auth.services.jwt;

public interface JwtService {
    String generateAccessToken(Long userId);
    String generateRefreshToken(Long userId);
    Long validate(String token);
}
