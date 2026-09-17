package com.agro.feature.user.controller;

import com.agro.core.api.Api;
import com.agro.feature.user.domain.User;
import com.agro.feature.user.dtos.UserMapper;
import com.agro.feature.user.dtos.request.UserRequest;
import com.agro.feature.user.dtos.response.UserResponseSimple;
import com.agro.feature.user.dtos.response.UserWithCompanyLogo;
import com.agro.feature.user.orchestrator.RegisterOrchestrator;
import com.agro.feature.user.services.UserService;
import com.agro.shared.dtos.table.ColumnHeaderDTO;
import com.agro.shared.dtos.table.TableResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Api.USER)
@Tag(name = "Usuarios", description = "Operaciones relacionadas a la gestión de usuarios")
public class UserControllerREST {

    private final RegisterOrchestrator registerOrchestrator;

    private final UserService userService;

    public UserControllerREST(RegisterOrchestrator registerOrchestrator, UserService userService) {
        this.registerOrchestrator = registerOrchestrator;
        this.userService = userService;
    }

    @PostMapping(Api.REGISTER)
    @Operation(
            summary = "Registrar un usuario",
            description = """
                    Registra un nuevo usuario asociado a una empresa existente. \
                    Se genera automáticamente una contraseña temporal, que el usuario \
                    deberá cambiar en su primer inicio de sesión."""
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Usuario registrado correctamente.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserResponseSimple.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos de la solicitud inválidos (email malformado, rol inexistente, campos faltantes).",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "No se encontró la empresa indicada por id_company.",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Ya existe un usuario registrado con ese email.",
                    content = @Content(mediaType = "application/json")
            )
    })
    @PreAuthorize("hasRole('DUENIO')")
    public ResponseEntity<UserResponseSimple> register(@RequestBody UserRequest request) {
        User user = registerOrchestrator.register(request.toModel(), request.id_company(), request.id_branch());

        return ResponseEntity.ok(UserResponseSimple.fromModel(user));
    }

    @GetMapping
    @PreAuthorize("hasRole('DUENIO')")
        @Operation(summary = "Obtener usuarios paginados", description = "Devuelve los usuarios en formato tabla paginada.")
        public ResponseEntity<TableResponseDTO<UserResponseSimple>> getAll(
            @RequestAttribute("userId") Long  adminId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
        ) {
                Page<User> users = userService.findAll(page, size, adminId);
                Page<UserResponseSimple> response = users.map(UserResponseSimple::fromModel);

                List<ColumnHeaderDTO> columns = List.of(
                        new ColumnHeaderDTO("id", "ID"),
                        new ColumnHeaderDTO("name", "Nombre"),
                        new ColumnHeaderDTO("email", "Email"),
                        new ColumnHeaderDTO("role", "Rol"),
                        new ColumnHeaderDTO("branchDirection", "Sucursales")
                );

                return ResponseEntity.ok(
                        TableResponseDTO.fromPage(columns, response, UserResponseSimple::id)
                );
    }

    @GetMapping(Api.ME)
    public ResponseEntity<UserWithCompanyLogo> me(@RequestAttribute("userId") Long  userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(UserWithCompanyLogo.fromModel(user));
    }
}
