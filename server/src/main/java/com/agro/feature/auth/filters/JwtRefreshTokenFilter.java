package com.agro.feature.auth.filters;

import com.agro.core.api.Api;
import com.agro.feature.auth.services.jwt.JwtService;
import com.agro.feature.auth.services.jwt.exceptions.TokenException;
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
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.List;

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
        Cookie refreshCookie = WebUtils.getCookie(request, "refresh_token");

        if (refreshCookie == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            Long id = jwtService.validateRefreshToken(refreshCookie.getValue());
            UserDetails user = userDetailsService.loadUserById(id);
            request.setAttribute("userId", id);
            Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (TokenException e) {
            SecurityContextHolder.clearContext();
        }
        filterChain.doFilter(request, response);
    }
}
