package com.sciencetoonz.backend.controller;

import com.sciencetoonz.backend.dto.StudentDetailsDto;
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
    public ResponseEntity<String> addStudent(@Valid @RequestBody StudentDto studentDto, Authentication authentication) {
        return ResponseEntity.ok(studentService.addStudent(studentDto));
    }

    @GetMapping("/getStudents/{courseId}")
    public ResponseEntity<List<StudentDto>> getStudentsByCourseName (@PathVariable("courseId") Long courseId) {
        List<StudentDto> students = studentService.getStudentsByCourseId(courseId);
        return ResponseEntity.ok(students);
    }

    @PostMapping("/addStudentToCourseWithSessions/{courseId}/{studentEmail}")
    public ResponseEntity<String> addStudentToCourseWithSessions(@PathVariable("courseId") Long courseId, @PathVariable("studentEmail") String studentEmail,
                                                     @RequestBody List<Long> sessionsIds) {
        String success = studentService.addStudentToCourseWithSessions(studentEmail, courseId, sessionsIds);
        return ResponseEntity.ok(success);
    }

    @DeleteMapping("/removeStudentFromCourse/{courseId}/{studentId}")
    public ResponseEntity<String> removeStudentFromCourse(@PathVariable("courseId") Long courseId,
                                                          @PathVariable("studentId") Long studentId) {
        String success = studentService.removeStudentFromCourse(studentId, courseId);
        return ResponseEntity.ok(success);
    }

    @GetMapping("/getStudentDetails/{studentId}")
    public ResponseEntity<StudentDetailsDto> getStudentDetails(@PathVariable("studentId") Long studentId) {
        return ResponseEntity.ok(studentService.getStudentDetails(studentId));
    }

    @GetMapping("/getStudentsWithoutCourse/{courseId}")
    public ResponseEntity<List<StudentDto>> getStudentsWithoutCourse(@PathVariable("courseId") Long courseId) {
        return ResponseEntity.ok(studentService.getStudentsWithoutCourse(courseId));
    }

    @GetMapping("/getAllStudents")
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }
}
