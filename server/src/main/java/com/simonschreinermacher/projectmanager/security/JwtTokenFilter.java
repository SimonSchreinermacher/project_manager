package com.simonschreinermacher.projectmanager.security;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class JwtTokenFilter extends OncePerRequestFilter {
    private JwtTokenProvider provider;

    public JwtTokenFilter(JwtTokenProvider provider){
        this.provider = provider;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        if(token != null){
            try{
                Claims claims = provider.getClaims(token);
                System.out.println("Token expires: " + claims.getExpiration());
                System.out.println("Now: " + new Date());
                if(!claims.getExpiration().before(new Date())){
                    Authentication authentication = provider.getAuthentication(claims.getSubject());
                    if(authentication.isAuthenticated()){
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        chain.doFilter(request, response);
    }
}
