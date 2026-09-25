package com.agro.feature.provider.domain;

import com.agro.feature.payment.domain.VigentePayment;
import com.agro.shared.valueObjects.cuit.CuitValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "providers")
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tradeName;

    private String legalName;

    @Embedded
    private CuitValue cuit;

    private String phoneNumber;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Traveler traveler;

    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @OneToOne(mappedBy = "provider", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private VigentePayment vigentePayment;


    @Builder
    public Provider(String tradeName, String legalName, String cuit, String phoneNumber,
                    Traveler traveler, Long companyId,
                    VigentePayment vigent) {
        this.tradeName = tradeName;
        this.legalName = legalName;
        this.cuit = new CuitValue(cuit);
        this.phoneNumber = phoneNumber;
        this.traveler = traveler;
        this.companyId = companyId;
        this.vigentePayment = vigent;
    }

    public Provider(String phoneNumber, Traveler traveler) {
        this.phoneNumber = phoneNumber;
        this.traveler = traveler;
    }

    public String getCuit() {
        return cuit.get();
    }

    public List<String> getPaymentMethods() {
        return vigentePayment == null ? List.of() : vigentePayment.getPaymentsMethods();
    }

    public void update(Provider provider) {
        this.phoneNumber = provider.getPhoneNumber();
        this.traveler = provider.getTraveler();
    }
}