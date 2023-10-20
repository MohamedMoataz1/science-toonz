package com.sciencetoonz.backend.controller;

import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.dto.StudentEmailDto;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.service.StudentService;
import com.sciencetoonz.backend.util.AuthenticationUser;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/getStudents/{courseName}")
    public List<Student> getStudentsByCourseName (@PathVariable("courseName") String courseName) {
        return studentService.getStudentsByCourseName(courseName);
    }

    @PostMapping("/addStudentToCourse/{courseName}")
    public String addStudentToCourse(@RequestBody StudentEmailDto studentEmail, @PathVariable("courseName") String courseName) {
        return studentService.addStudentToCourse(studentEmail.getStudentEmail(), courseName);
    }
}
