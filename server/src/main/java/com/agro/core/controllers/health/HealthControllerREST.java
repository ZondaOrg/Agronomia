package com.agro.core.controllers.health;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthControllerREST {

    @Operation(
            summary = "Obtener estado del servidor",
            description = "Indica si el servidor esta levantado o no"
    )
    @ApiResponse(
            responseCode = "200",
            content = @Content(
                    mediaType = "application/json"
            )
    )
    @GetMapping
    public ResponseEntity<Boolean> health() {
        return ResponseEntity.ok(true);
    }
}
