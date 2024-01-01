package com.sciencetoonz.backend.controller;

import com.sciencetoonz.backend.dto.StudentDetailsDto;
import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/")
    public ResponseEntity<String> addStudent(@Valid @RequestBody StudentDto studentDto, Authentication authentication) {
        return ResponseEntity.ok(studentService.addStudent(studentDto));
    }

    @GetMapping("/byCourseId/{courseId}")
    public ResponseEntity<List<StudentDto>> getStudentsByCourseId (@PathVariable("courseId") Long courseId) {
        List<StudentDto> students = studentService.getStudentsDtoByCourseId(courseId);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/details/{studentId}")
    public ResponseEntity<StudentDetailsDto> getStudentDetails(@PathVariable("studentId") Long studentId) {
        return ResponseEntity.ok(studentService.getStudentDetails(studentId));
    }

    @GetMapping("/notInCourse/{courseId}")
    public ResponseEntity<List<StudentDto>> getStudentsWithoutCourse(@PathVariable("courseId") Long courseId) {
        return ResponseEntity.ok(studentService.getStudentsWithoutCourse(courseId));
    }

    @GetMapping("/")
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }
}
