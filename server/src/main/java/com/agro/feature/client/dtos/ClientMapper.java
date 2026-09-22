package com.agro.feature.client.dtos;

import com.agro.feature.client.domain.NaturalPerson;
import com.agro.feature.client.domain.RazonSocial;
import com.agro.feature.client.dtos.request.NaturalPersonRequest;
import com.agro.feature.client.dtos.request.RazonSocialRequest;
import com.agro.feature.client.dtos.response.NaturalPersonResponse;
import com.agro.feature.client.dtos.response.RazonSocialResponse;
import com.agro.shared.entities.province.Province;
import com.agro.shared.valueObjects.email.EmailValue;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ClientMapper {

    ClientMapper INSTANCE = Mappers.getMapper(ClientMapper.class);

    default Province map(String province) {
        return province == null || province.isBlank() ? null : Province.fromLabel(province);
    }

    default String map(Province province) {
        return province == null ? null : province.getLabel();
    }

    EmailValue email(String email);

    String email(EmailValue email);

    NaturalPerson dtoToModel(NaturalPersonRequest clientRequest);

    RazonSocial dtoToModel(RazonSocialRequest clientRequest);

    NaturalPersonResponse modelToDto(NaturalPerson clientAdded);

    RazonSocialResponse modelToDto(RazonSocial clientAdded);
}
