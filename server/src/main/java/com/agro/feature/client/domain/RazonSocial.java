package com.agro.feature.client.domain;

import com.agro.shared.entities.province.Province;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;

@Entity
@DiscriminatorValue("RAZON_SOCIAL")
public class RazonSocial extends Client{

    @Getter
    private String razonSocial;

    @Getter
    private String associateName;

    @Getter
    private String associateSurname;

    @Getter
    private String associatePhone;


    protected RazonSocial() {}

    public RazonSocial(
            String razonSocial,
            String associateName,
            String associateSurname,
            String associatePhone,
            String email,
            String cuit,
            String address,
            String location,
            Province province) {
        super(cuit, address,email, location, province);
        this.razonSocial = razonSocial;
        this.associateName = associateName;
        this.associateSurname = associateSurname;
        this.associatePhone = associatePhone;
    }

    public void update(
            String associateName,
            String associateSurname,
            String associatePhone,
            String email,
            String address,
            String location,
            Province province) {
        updateContactData(email, address, location, province);
        this.associateName = associateName;
        this.associateSurname = associateSurname;
        this.associatePhone = associatePhone;
    }

    @Override
    protected String computeSortKey() {
        return razonSocial;
    }

    @Override
    protected String computeSearchKey() {
        return razonSocial + " " + associateName + " " + associateSurname;
    }
}
