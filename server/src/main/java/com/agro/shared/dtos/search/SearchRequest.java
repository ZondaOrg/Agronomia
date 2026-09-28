package com.agro.shared.dtos.search;

import java.text.Normalizer;
import java.util.regex.Pattern;

public record SearchRequest(String description) {

    private static final Pattern DIACRITICS = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");

    public SearchRequest {
        if (description != null) {
            String decomposed = Normalizer.normalize(description, Normalizer.Form.NFD);
            description = DIACRITICS.matcher(decomposed).replaceAll("");
        }
    }
}