package com.agro.core.data.seeder.entity;

import com.agro.feature.provider.domain.Provider;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SeedContext {

    private Long companyId;
    private Long ownerUserId;
    private final List<Provider> providers = new ArrayList<>();
    private final List<Provider> productProviders = new ArrayList<>();

}