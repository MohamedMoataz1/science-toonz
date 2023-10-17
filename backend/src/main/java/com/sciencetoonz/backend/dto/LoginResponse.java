package com.sciencetoonz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private UserDetails user;
    private String token;
    private boolean user_role;
}
