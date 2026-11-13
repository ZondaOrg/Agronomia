package com.agro.core.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
@EnableCaching
public class CacheConfig {

    public static final String DOLAR_OFICIAL = "dolarOficial";

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager caffine = new CaffeineCacheManager();

        caffine.registerCustomCache(DOLAR_OFICIAL,
                Caffeine.newBuilder()
                        .expireAfterWrite(Duration.ofMinutes(30))
                        .maximumSize(10)
                        .build());

        return caffine;
    }
}
