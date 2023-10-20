package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.SessionDto;
import com.sciencetoonz.backend.model.Session;

import java.util.List;

public interface SessionService {
    public Session createSession(SessionDto sessionDto, String courseName);
    public List<Session> getSessionsByCourseName(String courseName);
}
