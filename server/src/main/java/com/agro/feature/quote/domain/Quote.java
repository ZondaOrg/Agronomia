package com.agro.feature.quote.domain;

import com.agro.feature.quote.domain.exceptions.InvalidQuantityException;
import com.agro.feature.quote.domain.exceptions.NegativeAmountException;

import java.math.BigDecimal;
import java.util.List;

public class Quote {

    private BigDecimal listPrice;
    private BigDecimal ivaRate;
    private BigDecimal freight;
    private List<BigDecimal> optionalPrices;
    private Integer quantity;

    public Quote(BigDecimal listPrice, BigDecimal ivaRate, BigDecimal freight, List<BigDecimal> optionalPrices, Integer quantity) {
        setListPrice(listPrice);
        setIvaRate(ivaRate);
        setFreight(freight);
        setOptionalPrices(optionalPrices);
        setQuantity(quantity);
    }

    public BigDecimal getTotal() {
        BigDecimal optionalsTotal = optionalPrices.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal unitPrice = listPrice.add(optionalsTotal).multiply(BigDecimal.ONE.add(ivaRate)).add(freight);
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    private void validateNotNegative(BigDecimal amount, String field) {
        if (amount.signum() < 0) {
            throw new NegativeAmountException(field);
        }
    }

    private void setListPrice(BigDecimal listPrice) {
        validateNotNegative(listPrice, "precio de lista");
        this.listPrice = listPrice;
    }

    private void setIvaRate(BigDecimal ivaRate) {
        validateNotNegative(ivaRate, "IVA");
        this.ivaRate = ivaRate;
    }

    private void setFreight(BigDecimal freight) {
        validateNotNegative(freight, "flete");
        this.freight = freight;
    }

    private void setOptionalPrices(List<BigDecimal> optionalPrices) {
        optionalPrices.forEach(price -> validateNotNegative(price, "opcional"));
        this.optionalPrices = List.copyOf(optionalPrices);
    }

    private void setQuantity(Integer quantity) {
        if (quantity < 1) {
            throw new InvalidQuantityException(quantity);
        }
        this.quantity = quantity;
    }
}
