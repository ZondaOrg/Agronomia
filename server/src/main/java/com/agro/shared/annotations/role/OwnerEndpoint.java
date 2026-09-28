package com.agro.shared.annotations.role;

import com.agro.shared.exceptions.dto.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasRole('OWNER')")
@SecurityRequirement(name = "bearerAuth")
@Operation(description = "Requiere rol OWNER")
@ApiResponse(
        responseCode = "401",
        description = "No autenticado",
        content = @Content(
                schema = @Schema(implementation = ErrorResponse.class),
                examples = @ExampleObject(value = """
                        {
                          "id": "c459dcf9-8877-40b0-b875-a08c68131d2a",
                          "title": "Unauthorized",
                          "message": "No se pudo realizar la autenticación",
                          "path": "/api/v1/recurso",
                          "timestamp": "2026-09-16T14:42:47.493",
                          "cause": "INVALID_TOKEN",
                          "motives": null
                        }
                        """)
        )
)
@ApiResponse(
        responseCode = "403",
        description = "No autorizado (requiere rol OWNER)",
        content = @Content(
                schema = @Schema(implementation = ErrorResponse.class),
                examples = @ExampleObject(value = """
                        {
                          "id": "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
                          "title": "Forbidden",
                          "message": "No tiene permisos para realizar esta acción (Requiere rol OWNER)",
                          "path": "/api/v1/recurso",
                          "timestamp": "2026-09-16T14:42:47.493",
                          "cause": "FORBIDDEN",
                          "motives": null
                        }
                        """)
        )
)
public @interface OwnerEndpoint {
}