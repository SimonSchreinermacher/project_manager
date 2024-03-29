package com.simonschreinermacher.projectmanager.security;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider implements Serializable {

    Dotenv dotenv = Dotenv.configure().directory("../").load();
    private String secret = dotenv.get("JWT_TOKEN_SECRET");

    private long tokenExpiration = 1000 * 60 * 60;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostConstruct
    protected void init(){
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String createToken(String username){
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("auth", new SimpleGrantedAuthority("ROLE_USER"));
        Date now = new Date();
        return Jwts.builder().setClaims(claims).setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenExpiration))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    public Claims getClaims(String token){
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public Authentication getAuthentication(String username){
        UserDetails details = userDetailsService.loadUserByUsername(username);
        return new UsernamePasswordAuthenticationToken(details.getUsername(), details.getPassword(), details.getAuthorities());
    }

    public boolean validToken(String token){
        try{
            Claims claims = getClaims(token);
            if(!claims.getExpiration().before(new Date())){
                return true;
            }
            return false;
        }
        catch (Exception e){
            return false;
        }
    }
}
