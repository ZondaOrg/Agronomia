package com.agro.feature.auth.services.jwt;

import com.agro.feature.auth.services.jwt.exceptions.TokenException;
import com.agro.feature.auth.services.userDetails.UserCredentials;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtServiceImpl implements JwtService {

    @Value("${jwt.secret}")
    private String key;

    private Key getKey() {
        return Keys.hmacShaKeyFor(key.getBytes());
    }

    @Override
    public String generate(UserCredentials credentials) {
        return Jwts.builder()
                .subject(credentials.getId().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
                .claims(claims(credentials))
                .signWith(getKey())
                .compact();
    }

    private Map<String, Object> claims(UserCredentials credentials) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", credentials.getName());
        claims.put("role", credentials.getRole());
        claims.put("jti", UUID.randomUUID().toString());
        return claims;
    }

    @Override
    public Long validate(String token) {
        try {
            Jws<Claims> claims = getClaims(token);
            String sub = claims.getPayload().getSubject();
            return Long.parseLong(sub);
        }
        catch(ExpiredJwtException e) {
            throw new TokenException("El token se encuentra expirado");
        }
        catch(MalformedJwtException | IllegalArgumentException e) {
            throw new TokenException("El token está mal formado");
        }
        catch(UnsupportedJwtException e) {
            throw new TokenException("El formato del token no es soportado");
        }
        catch(StringIndexOutOfBoundsException | NullPointerException e) {
            throw new TokenException("El token se encuentra vacio");
        }
    }

    private Jws<Claims> getClaims(String token) {
        return Jwts.parser().
                verifyWith((SecretKey) getKey()).
                build().
                parseSignedClaims(token);
    }
}
