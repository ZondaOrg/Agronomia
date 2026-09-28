package com.agro.feature.user.domain;

import com.agro.feature.branch.domain.Branch;
import com.agro.feature.company.domain.Company;
import com.agro.shared.entities.rol.Role;
import com.agro.shared.valueObjects.email.EmailValue;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.security.SecureRandom;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter(AccessLevel.PRIVATE)
@SuperBuilder(toBuilder = true)
public class User {

    private static final String PASSWORD_CHARS =
            "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    @Id
    @GeneratedValue
    @Getter
    private Long id;

    @Getter
    private String name;

    @Getter
    private String surname;

    @Getter
    private Role role;

    @Getter
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private Branch branch;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @Getter
    private Company company;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "email", unique = true))
    private EmailValue email;

    @Getter
    private String password;

    public User(String name, Role role, String surname, String email, String password) {
        setName(name);
        setEmail(new EmailValue((email)));
        setRole(role);
        setPassword(password);
    }

    public String getEmail() {
        return this.email.get();
    }

    public void addEncriptedPassword(String encripted) {
        setPassword(encripted);
    }

    public String generateTemporalPassword() {
        int length = 10;
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(PASSWORD_CHARS.charAt(RANDOM.nextInt(PASSWORD_CHARS.length())));
        }
        String rawPassword = sb.toString();
        setPassword(rawPassword);
        return rawPassword;
    }

    public void addCompany(Company company) {
        setCompany(company);
    }

    public String getLogo() {
        return getCompany().getLogo().getUrl();
    }

    public String getNameRol() {
        return role.getNombre();
    }

    public String getFullName() {
        return getName() + " " + getSurname();
    }

    public String getBranchDirection() {
        return branch.getFullDirection();
    }

    public void addBranch(Branch branch) {
        setBranch(branch);
    }
}