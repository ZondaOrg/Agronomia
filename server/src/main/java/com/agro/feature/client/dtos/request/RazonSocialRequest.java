package com.agro.feature.client.dtos.request;

import com.agro.shared.annotations.constraints.ValidPhone;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RazonSocialRequest(
        @NotBlank String razonSocial,
        @NotBlank @NotNull String cuit,
        String address,
        @NotBlank String location,
        @NotBlank String province,
        @NotBlank @NotNull String associateName,
        @NotBlank @NotNull String associateSurname,
        @NotBlank @NotNull @ValidPhone String associatePhone,
        @Email String email
) implements ClientRequest {
}
