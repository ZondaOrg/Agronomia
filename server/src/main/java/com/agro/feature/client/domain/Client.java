package com.agro.feature.client.domain;

import com.agro.shared.entities.province.Province;
import com.agro.shared.persistence.excepitons.NormaliceText;
import com.agro.shared.valueObjects.cuit.CuitValue;
import com.agro.shared.valueObjects.email.EmailValue;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "clients")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "client_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Client {

    @Id
    @GeneratedValue
    @Getter
    private Long id;

    @Embedded
    private CuitValue cuit;

    @Getter
    private String address;

    @Embedded
    private EmailValue email;

    @Getter
    private String location;

    @Getter
    private Province province;

    @Setter
    @Column(name = "company_id", nullable = false)
    private Long companyId;

    @Column(name = "sort_key", nullable = false)
    private String sortKey;

    @Column(name = "search_text", nullable = false)
    private String searchText;

    @PrePersist @PreUpdate
    protected void onSave() {
        this.sortKey = NormaliceText.normalize(computeSortKey());
        this.searchText = NormaliceText.normalize(computeSearchKey());
    }

    public Client(String cuit, String address, String email, String location, Province province) {
        this.cuit = new CuitValue(cuit);
        this.email = new EmailValue(email);
        this.address = address;
        this.location = location;
        this.province = province;
    }

    public String getCuit() {
        return cuit.get();
    }

    public String getEmail() {
        return email == null ? null : email.get();
    }

    protected void updateContactData(String email, String address, String location, Province province) {
        this.email = new EmailValue(email);
        this.address = normalizeNullable(address);
        this.location = normalizeNullable(location);
        this.province = province;
    }

    private String normalizeNullable(String value) {
        return value == null || value.isBlank() ? null : value;
    }

    protected abstract String computeSortKey();
    protected abstract String computeSearchKey();
}
