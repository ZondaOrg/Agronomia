package com.agro.shared.dtos.error;

public enum CauseError {
    INTERNAL_SERVER_ERROR("INTERNAL_SERVER_ERROR"),
    INVALID_CREDENTIALS("INVALID_CREDENTIALS"),
    BUSINESS_RULE_VIOLATION("BUSINESS_RULE_VIOLATION"),
    BODY_SCHEMA_ERROR("BODY_SCHEMA_ERROR"),
    INVALID_SESSION("INVALID_SESSION"),
    EXPIRED_SESSION("EXPIRED_SESSION"),
    CONFLICT_RULE_VIOLATION("CONFLICT_RULE_VIOLATION");

    private String cause;

    CauseError(String cause) {
        this.cause = cause;
    }

    String getCause() {
        return cause;
    }
}
