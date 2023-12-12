package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.SessionDto;
import com.sciencetoonz.backend.model.Session;
import com.sciencetoonz.backend.model.Student;

import java.util.List;

public interface SessionService {
    public Session createSession(SessionDto sessionDto, Long courseId);

    public List<SessionDto> getSessionsDtoByCourseId(Long courseId);
    public List<Session> getSessionsByCourseId(Long courseId);
    public List<Session> getSessionsbySessionsIds(List<Long> sessionsIds);
    public List<SessionDto> getSessionsOfCourseOfStudent(Long studentId, Long courseId);
    public String addSessionsToStudent(List<Session> sessionList, List<Session> sessions, Student student);

    public String updateCourseSession(Long sessionId, SessionDto sessionDto);
    public String removeSessionsOfCourseOfStudent(Long studentId, Long courseId);
    public String updateSessionsOfStudent(Long studentId, long courseId, List<Long> sessionIds);
    public String deleteSession(Long sessionId);
    public void deleteSessions(List<Session> sessions);
}
