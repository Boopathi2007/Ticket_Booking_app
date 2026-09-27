package com.eventease.service;

import com.eventease.dto.*;
import com.eventease.model.User;
import com.eventease.repository.UserRepository;
import com.eventease.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Map;

/**
 * Handles user registration and login.
 */
@Service
public class AuthService {

    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder encoder;
    @Autowired private JwtUtil jwtUtil;

    public Map<String, Object> register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(encoder.encode(req.getPassword()))
                .phone(req.getPhone())
                .role(User.Role.USER)
                .build();
        userRepo.save(user);
        return Map.of("message", "Registration successful! Please login.");
    }

    public Map<String, Object> login(LoginRequest req) {
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.getIsActive()) {
            throw new RuntimeException("Account deactivated. Contact support.");
        }
        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());

        return Map.of(
                "token",  token,
                "userId", user.getId(),
                "name",   user.getName(),
                "email",  user.getEmail(),
                "role",   user.getRole().name()
        );
    }
}
