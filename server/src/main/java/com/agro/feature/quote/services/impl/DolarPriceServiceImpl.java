package com.agro.feature.quote.services.impl;

import com.agro.core.config.CacheConfig;
import com.agro.feature.quote.client.DolarPriceClient;
import com.agro.feature.quote.domain.Quote;
import com.agro.feature.quote.services.DolarPriceService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class DolarPriceServiceImpl implements DolarPriceService {

    private DolarPriceClient client;

    public DolarPriceServiceImpl(DolarPriceClient client) {
        this.client = client;
    }

    @Override
    @Cacheable(cacheNames = CacheConfig.DOLAR_OFICIAL, sync = true)
    public BigDecimal get(Quote quote) {
        return client.getDolar(quote);
    }
}
