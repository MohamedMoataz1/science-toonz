package com.sciencetoonz.backend.util;

import com.sciencetoonz.backend.model.Teacher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
public class AuthenticationUser {
    private static Authentication authentication;

    public static UserDetails get(Authentication authentication) {
        return ((UserDetails) authentication.getPrincipal());
    }
}

