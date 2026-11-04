package com.agro.shared.valueObjects.email;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;

@Embeddable
@EqualsAndHashCode(of = "email")
public class EmailValue {

    @Column(name = "email")
    private String email;

    protected EmailValue() {}

    public EmailValue(String value) {
        validate(value);
    }

    private void validate(String email) {
        if(!email.isBlank() && isNotArroba(email)) {
            throw new EmailException();
        }
        this.email = email;
    }

    private Boolean isNotArroba(String email) {
        return !email.contains("@");
    }

    public String get() {
        return email;
    }
}
