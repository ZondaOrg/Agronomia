package com.agro.feature.auth.domain;

import com.agro.shared.entities.rol.Role;
import org.springframework.http.ResponseCookie;

public record Auth(
        String name,
        String surname,
        String email,
        Role role,
        String accessToken,
        ResponseCookie refreshCookie,
        Long id,
        String companyLogo
) {
}
