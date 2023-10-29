package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.SessionRepository;
import com.sciencetoonz.backend.dto.SessionDto;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Session;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.service.CourseService;
import com.sciencetoonz.backend.service.SessionService;
import com.sciencetoonz.backend.service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionServiceImpl implements SessionService {

    private final SessionRepository sessionRepository;
    private final CourseService courseService;
    private final ModelMapper modelMapper;

    public SessionServiceImpl(SessionRepository sessionRepository, ModelMapper modelMapper, CourseService courseService) {
        this.courseService = courseService;
        this.modelMapper = modelMapper;
        this.sessionRepository = sessionRepository;
    }

    public Session createSession(SessionDto sessionDto, String courseName) {
        Session session = modelMapper.map(sessionDto, Session.class);

        Course course = courseService.findByName(courseName);
        if (course == null) {
            throw ApiError.badRequest("This course doesn't exist");
        }

        String dayS = session.getDay().substring(0,3).toLowerCase();
        String timeS = session.getStartTime().toString().substring(0,2).toLowerCase();
        String courseS = courseName.substring(0,3).toLowerCase();
        session.setSessionName(courseS+dayS+timeS);
        session.setCourse(course);
        Session savedSession = sessionRepository.findBySessionName(session.getSessionName());
        if (savedSession != null) {
            throw ApiError.notFound("This session was added in this course before");
        }

        sessionRepository.save(session);
        return session;
    }

    public List<SessionDto> getSessionsByCourseId(Long courseId) {
        List<Session> sessions = sessionRepository.findSessionsByCourseId(courseId);
        List<SessionDto> sessionDtos = sessions.stream().map(session -> new SessionDto(session.getId(),session.getDay(), session.getStartTime(),
                session.getEndTime(),session.getDate().substring(0,10), session.getLink(), session.getCategory())).toList();
        return sessionDtos;
    }

    public List<Session> getSessionsbySessionsIds(List<Long> sessionsIds) {
        return sessionRepository.findAllByIdIn(sessionsIds);
    }

}
