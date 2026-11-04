package com.agro.feature.auth.globalExceptions;

import com.agro.core.api.Api;
import com.agro.feature.auth.domain.exceptions.UserNotFound;
import com.agro.shared.dtos.error.CauseError;
import com.agro.shared.dtos.error.RestErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class LoginExceptionHandler {

    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<RestErrorResponse> userNotFoundException(UserNotFound ex) {
        RestErrorResponse error = new RestErrorResponse(
                "Invalid Credentials",
                "The email or password is invalid",
                Api.AUTH + Api.LOGIN,
                CauseError.INVALID_CREDENTIALS
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<RestErrorResponse> invalidAuthException(AuthenticationException ex) {
        RestErrorResponse error = new RestErrorResponse(
                "Invalid Credentials",
                "The email or password is invalid",
                Api.AUTH + Api.LOGIN,
                CauseError.INVALID_CREDENTIALS
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
}
