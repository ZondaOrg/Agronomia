package com.agro.feature.client.dtos.request;

import com.agro.shared.annotations.constraints.ValidPhone;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NaturalPersonRequest(
        @Email String email,
        @NotBlank @NotNull String name,
        @NotBlank @NotNull String surname,
        @NotBlank @NotNull String cuit,
        @NotBlank @NotNull @ValidPhone String phone,
        String address,
        @NotBlank @NotNull String location,
        @NotBlank @NotNull String province
) implements ClientRequest {
}
