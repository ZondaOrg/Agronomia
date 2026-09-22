package com.agro.feature.payment.domain;

import com.agro.feature.provider.domain.Provider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "vigent_payments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VigentePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameList;

    @OneToMany(mappedBy = "vigentePayment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Builder.Default
    private List<Payment> payments = new ArrayList<>();

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "provider_id")
    private Provider provider;

    public List<String> getPaymentsMethods() {
        return payments.stream().map(Payment::getDescription).toList();
    }

    public void update(VigentePayment model) {
        nameList = model.getNameList();
        payments.addAll(model.getPayments());
    }
}