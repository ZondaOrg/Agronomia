package com.agro.feature.product.domain;

import com.agro.feature.product.domain.exceptions.ListPriceException;
import com.agro.feature.product.domain.exceptions.NegativePriceException;
import com.agro.feature.product.domain.exceptions.SameProductNameException;
import com.agro.feature.product.domain.valueObjects.ProductName;
import com.agro.shared.valueObjects.porcent.Porcent;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

import java.util.*;

@Entity
@Table(name = "products")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "id")
@Setter(AccessLevel.PRIVATE)
public class Product {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Column(name = "provider_id", nullable = false)
    private Long provider_id;

    @Embedded
    private ProductName name;

    @Embedded
    private Porcent bonification;

    @Getter
    private Long idType;

    @Column(length = 500)
    @Size(max = 500)
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

    @Getter
    @UpdateTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true,  fetch = FetchType.EAGER)
    private Set<Optional> optionals = new HashSet<>();

    public Product(
            String name,
            String description,
            Money money,
            Double listPrice,
            IVA iva,
            Long idType,
            Integer bonification) {
        this.name = new ProductName(name);
        this.bonification = new Porcent(bonification);
        this.iva = iva;
        this.idType = idType;
        this.money = money;
        this.description = description;
        this.freight = 0d;
        validateListPrice(listPrice);
    }

    public Product(
            String name,
            String description,
            Money money,
            Double listPrice,
            IVA iva,
            Long idType,
            Integer bonification,
            Double freight) {
        this.name = new ProductName(name);
        this.bonification = new Porcent(bonification);
        this.iva = iva;
        this.idType = idType;
        this.money = money;
        this.description = description;
        validateListPrice(listPrice);
        validateFreight(freight);
    }

    private void validateFreight(Double freight) {
        if(freight < 0) {
            throw new NegativePriceException(freight);
        }
        this.freight = freight;
    }

    private void validateListPrice(Double listPrice) {
        double abs = Math.abs(listPrice);

        if(abs >= 100_000_000d) {
            throw new ListPriceException();
        }
        else if(listPrice < 0) {
            throw new NegativePriceException(listPrice);
        }
        this.listPrice = listPrice;
    }

    public void validateName(String productName) {
        if(name.toEquals(productName)) {
            throw new SameProductNameException("Ya existe un producto con el nombre " + productName);
        }
    }

    public String getName() {
        return name.get();
    }

    public String getFormatName() {
        return name.getFormatText();
    }

    public Integer getBonification() {
        return bonification.get();
    }

    public void assocIdProvider(Long idProvider) {
        this.provider_id = idProvider;
    }

    void addOptional(Optional optional) {
        optionals.add(optional);
    }

    public List<Optional> getOptionals() {
        return optionals.stream().toList();
    }

    public boolean hasName(String productName) {
        return name.toEquals(productName);
    }

    public void edit(
            Money money,
            Double listPrice,
            IVA iva,
            Integer bonification,
            Double freight,
            String description,
            List<String> toDelete) {
        setMoney(money);
        validateListPrice(listPrice);
        setIva(iva);
        setBonification(new Porcent(bonification));
        validateFreight(freight);
        setDescription(description);
        optionals.removeIf(o -> toDelete.contains(o.getName()));
        createdAt = LocalDateTime.now();
    }

    public void assocIdType(Long idType) {
        this.idType =idType;
    }
}
