package com.agro.feature.company.dtos.response;

import com.agro.feature.company.domain.Company;
import org.jspecify.annotations.Nullable;

import java.util.List;

public record CompanyResponse(
        long id,
        String name,
        String legalName,
        String cuit,
        List<BranchResponseDTO> branches,
        String logo
) {
    public static @Nullable CompanyResponse fromModel(Company company) {
        List<BranchResponseDTO> responseBranches = company.getBranches().stream().map(BranchResponseDTO::fromModel).toList();
        return new CompanyResponse(company.getId(), company.getName(), company.getLegalName(), company.getCuit(), responseBranches ,company.getLogo().getUrl());
    }
}
