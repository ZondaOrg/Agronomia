package com.agro.feature.auth.services.jwt;

import com.agro.feature.auth.services.jwt.exceptions.TokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.security.SignatureException;
import java.time.Duration;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.access.secret}")
    private String accessKey;

    @Value("${jwt.refresh.secret}")
    private String refreshKey;

    private SecretKey getAccessKey() {
        return Keys.hmacShaKeyFor(accessKey.getBytes());
    }

    private SecretKey getRefreshKey() {
        return Keys.hmacShaKeyFor(refreshKey.getBytes());
    }

    @Override
    public String generateAccessToken(Long userId) {
        return build(userId, getAccessKey(), System.currentTimeMillis() + Duration.ofMinutes(10).toMillis());
    }

    @Override
    public String generateRefreshToken(Long userId) {
        return build(userId, getRefreshKey(), System.currentTimeMillis() + Duration.ofHours(8).toMillis());
    }

    private String build(Long userId, Key key, Long duration) {
        return Jwts.builder()
                .subject(userId.toString())
                .issuedAt(new Date())
                .expiration(new Date(duration))
                .claim("jti", UUID.randomUUID().toString())
                .signWith(key)
                .compact();
    }

    @Override
    public Long validateAccessToken(String token) {
        return validate(token, getAccessKey());
    }

    @Override
    public Long validateRefreshToken(String token) {
        return validate(token, getRefreshKey());
    }

    private Long validate(String token, SecretKey keys) {
        try {
            Jws<Claims> claims = getClaims(token, keys);
            String sub = claims.getPayload().getSubject();
            return Long.parseLong(sub);
        }
        catch(ExpiredJwtException e) {
            throw new TokenException("El token se encuentra expirado");
        }
        catch (JwtException | IllegalArgumentException e) {
            throw new TokenException("El token es invalido");
        }
        catch(StringIndexOutOfBoundsException | NullPointerException e) {
            throw new TokenException("El token se encuentra vacio");
        }
    }

    private Jws<Claims> getClaims(String token, SecretKey keys) {
        return Jwts.parser().
                verifyWith(keys).
                build().
                parseSignedClaims(token);
    }
}
