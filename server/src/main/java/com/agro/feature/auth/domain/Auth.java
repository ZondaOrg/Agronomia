package com.agro.feature.auth.domain;

import com.agro.shared.entities.rol.Role;

public record Auth(
        String name,
        String surname,
        String email,
        Role role,
        String accessToken,
        String refreshToken,
        Long id,
        String companyLogo
) {
}
