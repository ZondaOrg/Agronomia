package com.agro.feature.quote.client.impl;

import com.agro.feature.quote.domain.Quote;
import com.agro.feature.quote.client.DolarPriceClient;
import com.agro.feature.quote.domain.exceptions.NotDolarPrice;
import com.agro.feature.quote.dtos.dolarPrice.response.DolarPriceResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.*;

import java.math.BigDecimal;

@Service
public class DolarPriceClientImpl implements DolarPriceClient {

    private RestClient client;

    public DolarPriceClientImpl(RestClient client) {
        this.client = client;
    }

    @Override
    public BigDecimal getDolar(Quote quote) {
        try {
            DolarPriceResponse dolar = client
                    .get()
                    .uri("/dolares/oficial")
                    .retrieve()
                    .body(DolarPriceResponse.class);
            return new BigDecimal(dolar.compra());
        }
        catch (RestClientException | NullPointerException e) {
            throw new NotDolarPrice("No se pudo obtener el precio del dolar oficial", quote.getTotal());
        }
    }
}
