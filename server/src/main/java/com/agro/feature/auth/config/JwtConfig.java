package com.agro.feature.auth.config;

import com.agro.core.api.Api;
import com.agro.feature.auth.entrypoints.JwtEntryPoint;
import com.agro.feature.auth.filters.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class JwtConfig {

    private JwtFilter filter;
    private JwtEntryPoint entrypoint;

    public JwtConfig(JwtFilter filter, JwtEntryPoint entrypoint) {
        this.filter = filter;
        this.entrypoint = entrypoint;

    }

    @Bean
    public SecurityFilterChain fwtFilter(HttpSecurity http) {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/").permitAll()
                                .requestMatchers(
                                        "/swagger-ui/**",
                                        "/swagger-ui.html",
                                        "/v3/api-docs/**"
                                ).permitAll()
                                .requestMatchers(Api.HEALTH).permitAll()
                                .requestMatchers("/error").permitAll()
                                .requestMatchers("/" + Api.AUTH + Api.LOGIN).permitAll()
                                .anyRequest().authenticated())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(entrypoint))
                .addFilterAfter(filter, UsernamePasswordAuthenticationFilter.class);

        return  http.build();
    }
}
