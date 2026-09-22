package com.agro.feature.product.domain;


import lombok.Getter;

public class Optional {

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
