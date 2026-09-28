package com.agro.feature.user.dtos.request;


import com.agro.feature.user.domain.User;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.valueObjects.email.EmailValue;
import jakarta.validation.constraints.NotBlank;

public record UserRequest(
        @NotBlank
        String name,
        @NotBlank
        String surname,
        @NotBlank
        String rol,
        @NotBlank
        String email,
        @NotBlank
        Long id_company,
        @NotBlank
        Long id_branch
) {
    public User toModel() {
        return User.builder()
                .name(name)
                .surname(surname)
                .email(new EmailValue(email))
                .role(Role.valueOf(rol))
                .build();
    }
}
