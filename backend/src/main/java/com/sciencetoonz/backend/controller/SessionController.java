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

    @PostMapping("/createSession/{courseName}")
    public ResponseEntity<String> createSession(@RequestBody SessionDto sessionDto,@PathVariable("courseName") String courseName) {
        Session session = sessionService.createSession(sessionDto,courseName);
        return ResponseEntity.status(HttpStatus.CREATED).body("Session created with name = "+ session.getSessionName());
    }

    @GetMapping("/getSessionsByCourse/{courseName}")
    public List<SessionDto> getSessionsByCourse(@PathVariable("courseName") String courseName) {
        return sessionService.getSessionsByCourseName(courseName);
    }



}
