package com.agro.feature.product.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "optionals")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Optional {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Getter
    private String name;

    @Getter
    private Double price;

    @Getter
    private Money money;

    public Optional(Product product, String name, Double price) {
        product.addOptional(this);
        this.product = product;
        this.name = name;
        this.price = price;
        this.money = product.getMoney();
    }
}
