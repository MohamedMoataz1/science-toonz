package com.sciencetoonz.backend.controller;

import com.sciencetoonz.backend.dto.SessionDto;
import com.sciencetoonz.backend.model.Session;
import com.sciencetoonz.backend.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/session")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/createSession/{courseId}")
    public ResponseEntity<String> createSession(@RequestBody SessionDto sessionDto,@PathVariable("courseId") Long courseId) {
        Session session = sessionService.createSession(sessionDto,courseId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Session created with id = "+ session.getId());
    }

    @GetMapping("/getSessionsByCourse/{courseId}")
    public ResponseEntity<List<SessionDto>> getSessionsByCourse(@PathVariable("courseId") Long courseId) {
        return ResponseEntity.ok(sessionService.getSessionsByCourseId(courseId));
    }

    @GetMapping("/getSessionsOfStudentOfCourse/{studentId}/{courseId}")
    public ResponseEntity<List<SessionDto>> getSessionsOfStudentOfCourse(@PathVariable("studentId")Long studentId,
                                                                      @PathVariable("courseId")Long courseId) {
        return ResponseEntity.ok(sessionService.getSessionsOfCourseOfStudent(studentId,courseId));
    }

    @PostMapping("/addSessionsToStudent/{studentEmail}")
    public ResponseEntity<String> addSessionsToStudent(@RequestBody List<Long> sessionsIds,
                                                       @PathVariable("studentEmail") String studentEmail) {
        String success = sessionService.addSessionsToStudent(studentEmail, sessionsIds);
        return ResponseEntity.ok(success);
    }

    @PutMapping("/updateCourseSession/{sessionId}")
    public ResponseEntity<String> updateCourseSession(@PathVariable("sessionId") Long sessionId,
                                                @RequestBody SessionDto sessionDto) {
        String success = sessionService.updateCourseSession(sessionId,sessionDto);
        return ResponseEntity.ok(success);
    }
}
