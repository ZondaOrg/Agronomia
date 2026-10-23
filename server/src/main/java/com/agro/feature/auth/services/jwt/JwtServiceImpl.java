package com.agro.feature.auth.services.jwt;

import com.agro.feature.auth.services.jwt.exceptions.TokenException;
import com.agro.feature.auth.services.userDetails.UserCredentials;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Duration;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.secret}")
    private String key;

    private Key getKey() {
        return Keys.hmacShaKeyFor(key.getBytes());
    }

    @Override
    public String generateAccessToken(UserCredentials credentials) {
        return Jwts.builder()
                .subject(credentials.getId().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + Duration.ofMinutes(10).toMillis()))
                .claim("role", credentials.getRole())
                .claim("jti", UUID.randomUUID().toString())
                .signWith(getKey())
                .compact();
    }

    @Override
    public String generateRefreshToken(UserCredentials credentials) {
        return Jwts.builder()
                .subject(credentials.getId().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + Duration.ofHours(8).toMillis()))
                .claim("jti", UUID.randomUUID().toString())
                .signWith(getKey())
                .compact();
    }

    @Override
    public Long validate(String token) {
        try {
            Jws<Claims> claims = getClaims(token);
            String sub = claims.getPayload().getSubject();
            return Long.parseLong(sub);
        }
        catch(ExpiredJwtException e) {
            throw new TokenException("El accessToken se encuentra expirado");
        }
        catch(MalformedJwtException | IllegalArgumentException e) {
            throw new TokenException("El accessToken está mal formado");
        }
        catch(UnsupportedJwtException e) {
            throw new TokenException("El formato del accessToken no es soportado");
        }
        catch(StringIndexOutOfBoundsException | NullPointerException e) {
            throw new TokenException("El accessToken se encuentra vacio");
        }
    }

    private Jws<Claims> getClaims(String token) {
        return Jwts.parser().
                verifyWith((SecretKey) getKey()).
                build().
                parseSignedClaims(token);
    }
}
