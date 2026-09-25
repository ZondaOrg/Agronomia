package com.agro.feature.payment.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE payment SET deleted = true WHERE id=?")
@SQLRestriction("deleted=false")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private Application application;

    private double percentage;

    private double bonusPercentage;

    @ManyToOne
    @JoinColumn(name = "vigentePayments_id")
    private VigentePayment vigentePayment;

    @Builder.Default
    @Column(nullable = false)
    private boolean deleted = false;
}