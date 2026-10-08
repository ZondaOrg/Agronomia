package com.agro.core.data.seeder.impl;

import com.agro.core.data.seeder.EntitySeeder;
import com.agro.core.data.seeder.entity.SeedContext;
import com.agro.feature.product.domain.IVA;
import com.agro.feature.product.domain.Money;
import com.agro.feature.product.domain.Product;
import com.agro.feature.product.services.ProductService;
import com.agro.feature.productType.domain.ProductType;
import com.agro.feature.productType.services.ProductTypeService;
import com.agro.feature.provider.domain.Provider;
import com.agro.feature.provider.service.ProviderService;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Profile("dev")
@Order(3)
public class ProductSeeder implements EntitySeeder {

    private final ProductService productService;
    private final ProviderService providerService;
    private final ProductTypeService productTypeService;

    public ProductSeeder(
            ProductService productService,
            ProviderService providerService,
            ProductTypeService productTypeService
    ) {
        this.productService = productService;
        this.providerService = providerService;
        this.productTypeService = productTypeService;
    }

    @Override
    public void seed(SeedContext context) {
        Long companyId = context.getCompanyId();

        Provider provider1 = providerService.save(Provider.builder()
                .tradeName("Agroinsumos del Norte")
                .legalName("Agroinsumos del Norte S.R.L.")
                .cuit("31-87654321-1")
                .phoneNumber("11-4444-5555")
                .companyId(companyId)
                .build());

        Provider provider2 = providerService.save(Provider.builder()
                .tradeName("Agroinsumos del Norte")
                .legalName("Agroinsumos del Norte S.R.L.")
                .cuit("37-87654121-6")
                .phoneNumber("11-4444-5555")
                .companyId(companyId)
                .build());

        Map<String, Long> typeIds = loadTypeIds(companyId);

        List<ProductSpec> specsProvider1 = new ArrayList<>(baseSpecs());
        specsProvider1.addAll(shovelSpecs());

        saveProducts(specsProvider1, provider1, typeIds);
        saveProducts(baseSpecs(), provider2, typeIds);
    }

    private Map<String, Long> loadTypeIds(Long companyId) {
        return productTypeService.findAllByCompanyId(companyId).stream()
                .collect(Collectors.toMap(ProductType::getName, ProductType::getId));
    }

    private void saveProducts(List<ProductSpec> specs, Provider provider, Map<String, Long> typeIds) {
        specs.forEach(spec -> {
            Long typeId = typeIds.get(spec.typeName());
            if (typeId == null) {
                throw new IllegalStateException("No existe el ProductType: " + spec.typeName());
            }
            productService.add(spec.toProduct(typeId), typeId, provider.getId());
        });
    }

    private List<ProductSpec> baseSpecs() {
        return List.of(
                new ProductSpec("Tractorzote", "Tractor Mega grande", Money.ARS, 1330D, IVA.GENERAL, "Tractor", 50, 10D),
                new ProductSpec("Tractocito", "Tractor chiquito", Money.ARS, 50D, IVA.GENERAL, "Tractor", 50, null),
                new ProductSpec("Camioncito", "Tolvas chiquito", Money.USD, 1D, IVA.REDUCIDA, "Tolva", 50, 30D),
                new ProductSpec("Camionzote", "Tolvas grande", Money.ARS, 20D, IVA.REDUCIDA, "Tolva", 50, 30D),
                new ProductSpec("Desmalezadora 1", "Desmalezadora mediana", Money.USD, 1D, IVA.REDUCIDA, "Desmalezadora", 50, 40D),
                new ProductSpec("Desmalezadora 2", "Desmalezadora chica", Money.USD, 1D, IVA.REDUCIDA, "Desmalezadora", 50, 40D)
        );
    }

    private List<ProductSpec> shovelSpecs() {
        return List.of(
                new ProductSpec("Palota", "Pala para salir a laburar", Money.ARS, 8000D, IVA.GENERAL, "Pala", 99, 800D),
                new ProductSpec("PalotITA", "Pala para salir a laburar poco", Money.ARS, 800D, IVA.GENERAL, "Pala", 50, 60D)
        );
    }

    private record ProductSpec(
            String name,
            String description,
            Money money,
            Double listPrice,
            IVA iva,
            String typeName,
            Integer bonification,
            Double freight
    ) {
        Product toProduct(Long typeId) {
            if (freight == null) {
                return new Product(name, description, money, listPrice, iva, typeId, bonification);
            }
            return new Product(name, description, money, listPrice, iva, typeId, bonification, freight);
        }
    }
}