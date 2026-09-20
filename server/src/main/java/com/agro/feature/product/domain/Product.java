package com.agro.feature.product.domain;

import com.agro.feature.product.domain.exceptions.SameProductNameException;
import com.agro.feature.product.domain.valueObjects.ProductName;

public class Product {
    private ProductName name;
    private String type;
    private String description;
    private Money money;
    private Double listPrice;
    private IVA iva;
    private Integer bonification;
    private Double freight;

    public Product(
            String name,
            String description,
            Money money,
            Double listPrice,
            IVA iva,
            Integer bonification) {
        this.name = new ProductName(name);
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
    }


    public String getName() {
        return name.get();
    }

    public void validateName(String productName) {
        if(name.toEquals(productName)) {
            throw new SameProductNameException("Ya existe un producto con el nombre " + productName);
        }
    }
}
