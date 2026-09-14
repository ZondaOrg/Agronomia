package com.agro.feature.client.dtos.request;

import com.agro.shared.annotations.constraints.ValidPhone;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record NaturalPersonRequest(
        @Email String email,
        @NotBlank @NotNull String name,
        @NotBlank @NotNull String surname,
        @NotBlank @Pattern(
                regexp = "^\\d{2}-\\d{8}-\\d{1}$",
                message = "El campo debe tener el formato de un cuit"
        )
        @NotBlank @NotNull String cuit,
        @NotBlank @NotNull @ValidPhone String phone,
        String address,
        @NotBlank @NotNull String location,
        @NotBlank @NotNull String province
) implements ClientRequest {
}
