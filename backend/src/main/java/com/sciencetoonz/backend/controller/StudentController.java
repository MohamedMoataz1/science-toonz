package com.sciencetoonz.backend.controller;

import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.service.StudentService;
import com.sciencetoonz.backend.util.AuthenticationUser;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/addStudent")
    public void addStudent(@Valid @RequestBody StudentDto studentDto, Authentication authentication) {
        System.out.println("Authenticated user: " + AuthenticationUser.get(authentication));
        studentService.addStudent(studentDto);
    }
}
