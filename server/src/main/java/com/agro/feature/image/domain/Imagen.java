package com.agro.feature.image.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "imagens")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "publicId")
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url ;

    private String publicId ;
}
