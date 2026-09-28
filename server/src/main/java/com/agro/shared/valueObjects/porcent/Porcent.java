package com.agro.shared.valueObjects.porcent;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode(of = "porcent")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Porcent {
    private Integer porcent;

    public Porcent(Integer porcent) {
        if(!isValid(porcent)) {
            throw new PorcentException("El porcentaje " + porcent + " no está entre 1 y 100");
        }
        this.porcent = porcent;
    }

    private Boolean isValid(Integer porcent) {
        return porcent > 0 && porcent <= 100;
    }

    public Integer get() {
        return porcent;
    }
}
