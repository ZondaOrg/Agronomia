package com.agro.feature.payment.domain;

public enum Application {
    NOAPLICA("No Aplica"),
    DESCUENTO("Descuento"),
    RECARGO("Recargo");

    private final String label;

    Application(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static Application fromLabel(String label) {
        for (Application value : values()) {
            if (value.label.equalsIgnoreCase(label)) {
                return value;
            }
        }
        throw new IllegalArgumentException("No existe Application con label: " + label);
    }
}