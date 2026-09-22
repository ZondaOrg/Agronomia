package com.agro.feature.company.orchestrador;

import com.agro.feature.company.contracts.CompanyDataService;
import com.agro.feature.company.domain.Company;
import com.agro.feature.image.contracts.SaveImageService;
import com.agro.feature.image.domain.Imagen;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class EditCompanyImpl implements EditCompany {

    private final CompanyDataService companyService;

    private final SaveImageService saveImageService;

    public EditCompanyImpl(CompanyDataService companyService, SaveImageService saveImageService) {
        this.companyService = companyService;
        this.saveImageService = saveImageService;
    }


    @Override
    public Company execute(Long adminId, Company model, Long id, MultipartFile logo) {
        Imagen imagen = saveImageService.saveImage(logo);

        model.setLogo(imagen);

        return companyService.editCompany(adminId, model, id);
    }
}
