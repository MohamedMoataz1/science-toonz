package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.LoginRequest;
import com.sciencetoonz.backend.dto.LoginResponse;

public interface LoginService {
    LoginResponse login(LoginRequest loginRequest);
}
