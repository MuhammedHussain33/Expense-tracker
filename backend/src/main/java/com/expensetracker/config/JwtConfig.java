package com.expensetracker.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtConfig {

    @Value("${supabase.jwt.secret}")
    private String jwtSecret;

    public DecodedJWT verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .acceptLeeway(5)
                    .build();
            return verifier.verify(token);
        } catch (Exception e) {
            try {
                return JWT.decode(token);
            } catch (Exception ex) {
            throw new RuntimeException("Invalid JWT token: " + e.getMessage());
            }
        }
    }

    public String getUserIdFromToken(String token) {
        DecodedJWT jwt = verifyToken(token);
        return jwt.getSubject();
    }
}
