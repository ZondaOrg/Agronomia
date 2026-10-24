package com.agro.feature.auth.filters;

import com.agro.core.api.Api;
import com.agro.feature.auth.services.jwt.JwtService;
import com.agro.feature.auth.services.userDetails.UserDetailsAdapter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
public class JwtRefreshTokenFilter extends OncePerRequestFilter {

    private JwtService jwtService;
    private UserDetailsAdapter userDetailsService;

    public JwtRefreshTokenFilter(JwtService jwtService, UserDetailsAdapter userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    private final List<RequestMatcher> PUBLICS = List.of(
            PathPatternRequestMatcher.withDefaults().matcher(HttpMethod.POST, "/" + Api.SESSION + Api.REFRESH)
    );

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return PUBLICS.stream().noneMatch(path -> path.matches(request));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Optional<Cookie> sessionCookie =
                Arrays.stream(
                        request.getCookies()).
                        filter(cookie -> Objects.equals(cookie.getName(), "refresh_token")).
                        findFirst();

        if (sessionCookie.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        String refreshToken = sessionCookie.get().getValue();
        Long id = jwtService.validateRefreshToken(refreshToken);
        UserDetails user = userDetailsService.loadUserById(id);
        request.setAttribute("userId", id);
        Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
        filterChain.doFilter(request, response);
    }
}
