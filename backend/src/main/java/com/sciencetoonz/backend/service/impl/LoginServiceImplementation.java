package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.dto.LoginRequest;
import com.sciencetoonz.backend.dto.LoginResponse;
import com.sciencetoonz.backend.service.LoginService;
import com.sciencetoonz.backend.util.AuthenticationUser;
import com.sciencetoonz.backend.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LoginServiceImplementation implements LoginService {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public LoginServiceImplementation(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        System.out.println("inside login");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        System.out.println(authentication);

        UserDetails user = AuthenticationUser.get(authentication);
        String accessToken = jwtUtil.generateAccessToken(user.getUsername());
        boolean user_type;
        if (user.getUsername().contains("admin")) {
            user_type = true;
        }
        else {
            user_type = false;
        }
        return new LoginResponse(user, accessToken, user_type);
    }


}
