package com.sciencetoonz.backend.controller;

import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.dto.StudentEmailDto;
import com.sciencetoonz.backend.model.Session;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.service.StudentService;
import com.sciencetoonz.backend.util.AuthenticationUser;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
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
        studentService.addStudent(studentDto);
    }

    @GetMapping("/getStudents/{courseName}")
    public ResponseEntity<List<Student>> getStudentsByCourseName (@PathVariable("courseName") String courseName) {
        List<Student> students = studentService.getStudentsByCourseName(courseName);
        return ResponseEntity.ok(students);
    }

    @PostMapping("/addStudentToCourse/{courseName}/{studentEmail}")
    public ResponseEntity<String> addStudentToCourse(@PathVariable("courseName") String courseName, @PathVariable("studentEmail") String studentEmail) {
        String success = studentService.addStudentToCourse(studentEmail, courseName);
        return ResponseEntity.ok(success);
    }

    @PostMapping("/addSessionsToStudent/{studentEmail}")
    public ResponseEntity<String> addSessionsToStudent(@RequestBody List<String> sessionsName,
                                       @PathVariable("studentEmail") String studentEmail) {
        String success = studentService.addSessionsToStudent(studentEmail, sessionsName);
        return ResponseEntity.ok(success);
    }
}
