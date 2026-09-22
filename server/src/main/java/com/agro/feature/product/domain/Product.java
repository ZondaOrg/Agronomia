package com.agro.feature.product.domain;

import com.agro.feature.product.domain.exceptions.ListPriceException;
import com.agro.feature.product.domain.exceptions.SameProductNameException;
import com.agro.feature.product.domain.valueObjects.ProductName;
import com.agro.shared.valueObjects.porcent.Porcent;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "provider_id", nullable = false)
    private Long provider_id;

    @Embedded
    private ProductName name;

    @Embedded
    private Porcent bonification;

    @Getter
    private String productType;

    @Getter
    private String description;

    @Getter
    @Enumerated(EnumType.STRING)
    private Money money;

    @Getter
    @Enumerated(EnumType.STRING)
    private IVA iva;

    @Getter
    private Double listPrice;

    @Getter
    private Double freight;

    public Product(
            String name,
            String description,
            Money money,
            Double listPrice,
            IVA iva,
            String productType,
            Integer bonification) {
        this.name = new ProductName(name);
        this.bonification = new Porcent(bonification);
        this.listPrice = validateListPrice(listPrice);
        this.iva = iva;
        this.productType = productType;
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
            String productType,
            Integer bonification,
            Double freight) {
        this.name = new ProductName(name);
        this.bonification = new Porcent(bonification);
        this.listPrice = validateListPrice(listPrice);
        this.iva = iva;
        this.productType = productType;
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

    public String getName() {
        return name.get();
    }

    public Integer getBonification() {
        return bonification.get();
    }

    public void assocIdProvider(Long idProvider) {
        this.provider_id = idProvider;
    }
}
