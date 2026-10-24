package com.agro.feature.auth.config;

import com.agro.core.api.Api;
import com.agro.feature.auth.entrypoints.JwtEntryPoint;
import com.agro.feature.auth.filters.JwtAccessTokenFilter;
import com.agro.feature.auth.filters.JwtRefreshTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class JwtConfig {

    private JwtAccessTokenFilter accessTokenFilter;
    private JwtRefreshTokenFilter refreshTokenFilter;
    private JwtEntryPoint entrypoint;

    public JwtConfig(JwtAccessTokenFilter filter, JwtRefreshTokenFilter refreshTokenFilter, JwtEntryPoint entrypoint) {
        this.accessTokenFilter = filter;
        this.entrypoint = entrypoint;
        this.refreshTokenFilter = refreshTokenFilter;
    }

    @Bean
    @Order(1)
    public SecurityFilterChain refreshTokenFilter(HttpSecurity http) {
        http
                .securityMatcher("/" + Api.SESSION + Api.REFRESH)
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(a -> a.anyRequest().authenticated())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(entrypoint))
                .addFilterBefore(refreshTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain accessTokenFilter(HttpSecurity http) {
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
                .addFilterAfter(accessTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
