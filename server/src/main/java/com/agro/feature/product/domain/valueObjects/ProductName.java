package com.agro.feature.product.domain.valueObjects;

import java.text.Normalizer;
import java.util.Objects;

public class ProductName {
    private String name;

    public ProductName(String name) {
        this.name = name;
    }
    public String get() {
        return name;
    }

    public Boolean toEquals(String productName) {
        return Objects.equals(parseName(name), parseName(productName));
    }

    private String parseName(String productName) {
        String normalice = Normalizer.normalize(
                productName.toLowerCase().replaceAll("\\s+", ""),
                Normalizer.Form.NFD);
        return normalice.replaceAll("\\p{M}", "");
    }
}
