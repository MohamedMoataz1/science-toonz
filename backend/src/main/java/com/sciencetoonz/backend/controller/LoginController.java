package com.sciencetoonz.backend.controller;

import com.sciencetoonz.backend.dto.LoginRequest;
import com.sciencetoonz.backend.dto.LoginResponse;
import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.dto.TeacherDto;
import com.sciencetoonz.backend.service.LoginService;
import com.sciencetoonz.backend.service.StudentService;
import com.sciencetoonz.backend.service.TeacherService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(loginService.login(loginRequest));
    }

//    @PostMapping("/addTeacher")
//    public void addTeacher(@Valid @RequestBody TeacherDto teacherDto) {
//        teacherService.saveTeacher(teacherDto);
//    }


}
