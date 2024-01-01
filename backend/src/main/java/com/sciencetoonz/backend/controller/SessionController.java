package com.sciencetoonz.backend.controller;

import com.sciencetoonz.backend.dto.SessionDto;
import com.sciencetoonz.backend.model.Session;
import com.sciencetoonz.backend.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/{courseId}")
    public ResponseEntity<String> createSession(@RequestBody SessionDto sessionDto,@PathVariable("courseId") Long courseId) {
        Session session = sessionService.createSession(sessionDto,courseId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Session created with id = "+ session.getId());
    }

    @GetMapping("/byCourseId/{courseId}")
    public ResponseEntity<List<SessionDto>> getSessionsByCourse(@PathVariable("courseId") Long courseId) {
        return ResponseEntity.ok(sessionService.getSessionsDtoByCourseId(courseId));
    }

    @GetMapping("/students/{studentId}/courses/{courseId}")
    public ResponseEntity<List<SessionDto>> getSessionsOfStudentOfCourse(@PathVariable("studentId")Long studentId,
                                                                      @PathVariable("courseId")Long courseId) {
        return ResponseEntity.ok(sessionService.getSessionsOfCourseOfStudent(studentId,courseId));
    }

    @PutMapping("/{sessionId}")
    public ResponseEntity<String> updateCourseSession(@PathVariable("sessionId") Long sessionId,
                                                @RequestBody SessionDto sessionDto) {
        String success = sessionService.updateCourseSession(sessionId,sessionDto);
        return ResponseEntity.ok(success);
    }

    @PutMapping("/students/{studentId}/courses/{courseId}")
    public ResponseEntity<String> updateSessionsOfStudent(@PathVariable("studentId") Long studentId,
                                                          @PathVariable("courseId") Long courseId,
                                                          @RequestBody List<Long> sessionIds) {
        String success = sessionService.updateSessionsOfStudent(studentId,courseId,sessionIds);
        return ResponseEntity.ok(success);
    }

    @DeleteMapping("/{sessionId}")
    public ResponseEntity<String> deleteSession(@PathVariable("sessionId") Long sessionId) {
        String success = sessionService.deleteSession(sessionId);
        return ResponseEntity.ok(success);
    }
}
