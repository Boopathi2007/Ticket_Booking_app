package com.eventease.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

/** DTO for login requests */
@Data
public class LoginRequest {
    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 6)
    private String password;
}
