package com.agro.feature.product.domain.valueObjects;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.text.Normalizer;
import java.util.Objects;

@Embeddable
@EqualsAndHashCode(of = "value")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductName {
    private String value;

    public ProductName(String name) {
        this.value = name;
    }
    public String get() {
        return value;
    }

    public Boolean toEquals(String productName) {
        return Objects.equals(parseName(value), parseName(productName));
    }

    private String parseName(String productName) {
        String normalice = Normalizer.normalize(
                productName.toLowerCase().replaceAll("\\s+", ""),
                Normalizer.Form.NFD);
        return normalice.replaceAll("\\p{M}", "");
    }
}
