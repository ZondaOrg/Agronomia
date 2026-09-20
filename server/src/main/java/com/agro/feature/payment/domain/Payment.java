package com.agro.feature.payment.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private Application application;

    private int percentage;

    private int bonusPercentage;

    @ManyToOne
    @JoinColumn(name = "vigentePayments_id")
    private VigentePayment vigentePayment;
}
