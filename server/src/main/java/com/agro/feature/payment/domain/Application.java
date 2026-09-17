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
}