package com.agro.feature.auth.services.jwt;

public interface JwtService {
    String generateAccessToken(Long userId);
    String generateRefreshToken(Long userId);
    Long validateAccessToken(String token);
    Long validateRefreshToken(String token);
}
