package com.agro.feature.payment.domain;

import com.agro.feature.provider.domain.Provider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "vigent_payments")
@EntityListeners(AuditingEntityListener.class)
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

    @Column(name = "update_at")
    @LastModifiedDate
    private LocalDateTime updateAt;

    public List<String> getPaymentsMethods() {
        return payments.stream().map(Payment::getDescription).toList();
    }

    public void update(VigentePayment model) {
        nameList = model.getNameList();
        payments.addAll(model.getPayments());
    }
}