package com.agro.feature.company.controller;

import com.agro.core.api.Api;
import com.agro.feature.company.contracts.CompanyDataService;
import com.agro.feature.company.domain.Company;
import com.agro.feature.company.dtos.response.CompanyEditDTO;
import com.agro.feature.company.dtos.response.CompanyResponse;
import com.agro.feature.company.orchestrador.EditCompany;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping(Api.COMPANY)
public class CompanyControllerREST {

    private final CompanyDataService companyDataService;

    private final EditCompany editCompany;

    public CompanyControllerREST(CompanyDataService companyDataService, EditCompany editCompany) {
        this.companyDataService = companyDataService;
        this.editCompany = editCompany;
    }

    @GetMapping
    @PreAuthorize("hasRole('DUENIO')")
    public ResponseEntity<CompanyResponse> getCompany(@RequestAttribute("userId") Long  userId) {
        Company company = companyDataService.getCompanyByUserId(userId);

        return ResponseEntity.ok(CompanyResponse.fromModel(company));
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('DUENIO')")
    public ResponseEntity<CompanyResponse> editCompany(
            @RequestAttribute("userId") Long  userId,
            @ModelAttribute CompanyEditDTO request) {
        Company company = editCompany.execute(userId, request.toModel(), request.id(), request.logo());

        return ResponseEntity.ok(CompanyResponse.fromModel(company));
    }
}
