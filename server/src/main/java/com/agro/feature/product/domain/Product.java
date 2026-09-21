package com.agro.feature.product.domain;

import com.agro.feature.product.domain.exceptions.AssignedProductTypeException;
import com.agro.feature.product.domain.exceptions.ListPriceException;
import com.agro.feature.product.domain.exceptions.SameProductNameException;
import com.agro.feature.product.domain.valueObjects.ProductName;
import com.agro.shared.valueObjects.porcent.Porcent;
import lombok.Getter;

public class Product {

    private ProductName name;

    private Porcent bonification;

    @Getter
    private String productType;

    @Getter
    private String description;

    @Getter
    private Money money;

    @Getter
    private Double listPrice;

    @Getter
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
        this.listPrice = validateListPrice(listPrice);
        this.iva = iva;
        this.money = money;
        this.description = description;
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
        this.listPrice = validateListPrice(listPrice);
        this.iva = iva;
        this.money = money;
        this.description = description;
        this.freight = freight;
    }

    private Double validateListPrice(Double listPrice) {
        double abs = Math.abs(listPrice);

         if(abs < 100_000_000d) {
             return listPrice;
         }
         else {
             throw new ListPriceException();
         }
    }

    public void validateName(String productName) {
        if(name.toEquals(productName)) {
            throw new SameProductNameException("Ya existe un producto con el nombre " + productName);
        }
    }

    public void setProductType(String productType) {
        if(this.productType != null) {
            throw new AssignedProductTypeException("Ya se encuentra asignado el tipo " + this.productType);
        }
        this.productType = productType;
    }

    public String getName() {
        return name.get();
    }

    public Integer getBonification() {
        return bonification.get();
    }
}
