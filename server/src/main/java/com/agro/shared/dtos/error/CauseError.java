package com.agro.shared.dtos.error;

public enum CauseError {
    INVALID_CREDENTIALS("INVALID_CREDENTIALS"),
    BODY_SCHEMA_ERROR("BODY_SCHEMA_ERROR"),
    INVALID_SESSION("INVALID_SESSION"),
    EXPIRED_SESSION("EXPIRED_SESSION"),
    ENTITY_NOT_FOUND("ENTITY_NOT_FOUND"),
    CONFLICT_RULE_VIOLATION("CONFLICT_RULE_VIOLATION");

    private String cause;

    CauseError(String cause) {
        this.cause = cause;
    }
}
