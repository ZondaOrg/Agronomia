package com.agro.feature.product.domain;

import com.agro.feature.product.domain.exceptions.SameProductNameException;
import com.agro.feature.product.domain.valueObjects.ProductName;
import com.agro.shared.valueObjects.porcent.Porcent;
import lombok.Getter;

public class Product {
    private ProductName name;
    private Porcent bonification;
    private String type;
    private String description;
    private Money money;
    private Double listPrice;
    private IVA iva;

    @Getter
    private Double freight;

    public Product(
            String name,
            String description,
            Money money,
            Double listPrice,
            IVA iva,
            Integer bonification) {
        this.name = new ProductName(name);
        this.bonification = new Porcent(bonification);
        this.freight = 0d;
    }

    public Product(
            String name,
            String description,
            Money money,
            Double listPrice,
            IVA iva,
            Integer bonification,
            Double freight) {
        this.name = new ProductName(name);
        this.bonification = new Porcent(bonification);
        this.freight = freight;
    }


    public String getName() {
        return name.get();
    }

    public Integer getBonification() {
        return bonification.get();
    }

    public void validateName(String productName) {
        if(name.toEquals(productName)) {
            throw new SameProductNameException("Ya existe un producto con el nombre " + productName);
        }
    }
}
