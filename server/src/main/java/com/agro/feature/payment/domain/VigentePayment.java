package com.agro.feature.payment.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "vigentePayments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VigentePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameList;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Builder.Default
    private List<Payment> payments = new ArrayList<>();

}
