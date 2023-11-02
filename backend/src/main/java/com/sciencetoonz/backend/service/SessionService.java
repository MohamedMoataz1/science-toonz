package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.SessionDto;
import com.sciencetoonz.backend.model.Session;

import java.util.List;

public interface SessionService {
    public Session createSession(SessionDto sessionDto, Long courseId);

    public List<SessionDto> getSessionsByCourseId(Long courseId);

    public List<Session> getSessionsbySessionsIds(List<Long> sessionsIds);
    public List<SessionDto> getSessionsOfCourseOfStudent(Long studentId, Long courseId);
    public String addSessionsToStudent(String studentEmail,Long courseId, List<Long> sessionsIds);
    public String updateCourseSession(Long sessionId, SessionDto sessionDto);
    public String removeSessionsOfCourseOfStudent(Long studentId, Long courseId);
    public String updateSessionsOfStudent(Long studentId, long courseId, List<Long> sessionIds);
}
