package com.agro.core.data.seeder.impl;

import com.agro.core.data.seeder.EntitySeeder;
import com.agro.core.data.seeder.entity.SeedContext;
import com.agro.feature.image.domain.Imagen;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.services.ProductTypeService;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
@Profile({"dev", "seed"})
@Order(2)
public class ProductTypeSeeder implements EntitySeeder {

    private static final Map<String, String> DEFAULT_TYPES = new LinkedHashMap<>();

    static {
        DEFAULT_TYPES.put("Tractor", "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166429/Tractor_gygv6c.png");
        DEFAULT_TYPES.put("Tolva", "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166428/Tolva_py7063.png");
        DEFAULT_TYPES.put("Semillero", "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166429/Semilleros_tejmoc.png");
        DEFAULT_TYPES.put("Acoplado", "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166428/Acoplados_cvuvmu.png");
        DEFAULT_TYPES.put("Desmalezadora", "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166429/Desmalezadoras_kzz3xg.png");
        DEFAULT_TYPES.put("Mixer", "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166429/Mixers_zvnsw2.png");
        DEFAULT_TYPES.put("Chimango", "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166428/Chimangos_m8mtoa.png");
        DEFAULT_TYPES.put("Comedor", "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166428/Comederos_scqdrs.png");
        DEFAULT_TYPES.put("Portarollo", "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166429/Portarollos_dud4lp.png");
        DEFAULT_TYPES.put("Pala", "https://res.cloudinary.com/dvkvlpq07/image/upload/v1791166429/Palas_a1penf.png");
    }

    private final ProductTypeService productTypeService;

    public ProductTypeSeeder(ProductTypeService productTypeService) {
        this.productTypeService = productTypeService;
    }

    @Override
    public void seed(SeedContext context) {
        List<ProductType> defaultTypes = DEFAULT_TYPES.entrySet().stream()
                .map(entry -> ProductType.builder()
                        .name(entry.getKey())
                        .imagen(Imagen.builder()
                                .url(entry.getValue())
                                .publicId(publicIdFrom(entry.getValue()))
                                .build())
                        .build())
                .toList();

        productTypeService.addAllInCompany(defaultTypes, context.getCompanyId());
    }

    private static String publicIdFrom(String url) {
        String file = url.substring(url.lastIndexOf('/') + 1);
        return file.substring(0, file.lastIndexOf('.'));
    }
}