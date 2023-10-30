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

    @GetMapping("/getStudents/{courseId}")
    public ResponseEntity<List<StudentDto>> getStudentsByCourseName (@PathVariable("courseId") Long courseId) {
        List<StudentDto> students = studentService.getStudentsByCourseId(courseId);
        return ResponseEntity.ok(students);
    }

    @PostMapping("/addStudentToCourse/{courseId}/{studentEmail}")
    public ResponseEntity<String> addStudentToCourse(@PathVariable("courseId") Long courseId, @PathVariable("studentEmail") String studentEmail,
                                                     @RequestBody List<Long> sessionsIds) {
        String success = studentService.addStudentToCourse(studentEmail, courseId, sessionsIds);
        return ResponseEntity.ok(success);
    }


}
