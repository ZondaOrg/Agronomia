package com.agro.core.handlers.model;

import java.util.Date;
import java.util.UUID;

public record BuisnessErrorResponse(
        String title,
        String message,
        String path,
        String id,
        Date timestamp
) {
    public BuisnessErrorResponse(String title, String message, String path) {
        this(title, message, path, UUID.randomUUID().toString(), new Date());
    }
}
