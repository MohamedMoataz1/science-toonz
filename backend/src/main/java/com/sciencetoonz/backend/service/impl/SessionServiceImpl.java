package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.CourseRepository;
import com.sciencetoonz.backend.Repository.SessionRepository;
import com.sciencetoonz.backend.dto.SessionDto;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Session;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.service.CourseService;
import com.sciencetoonz.backend.service.SessionService;
import lombok.val;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionServiceImpl implements SessionService {

    private SessionRepository sessionRepository;
    private CourseService courseService;
    private ModelMapper modelMapper;

    public SessionServiceImpl(SessionRepository sessionRepository, ModelMapper modelMapper, CourseService courseService) {
        this.courseService = courseService;
        this.modelMapper = modelMapper;
        this.sessionRepository = sessionRepository;
    }

    public Session createSession(SessionDto sessionDto, String courseName) {
        Session session = modelMapper.map(sessionDto, Session.class);
        Course course = courseService.findByName(courseName);
        String dayS = session.getDay().substring(0,3);
        String timeS = session.getStartTime().toString().substring(0,2);
        String courseS = courseName.substring(0,3);
        session.setSessionName(courseS+dayS+timeS);

        if (course == null) {
            throw ApiError.badRequest("This course doesn't exist");
        }
        session.setCourse(course);
        sessionRepository.save(session);
        return session;
    }

    public List<SessionDto> getSessionsByCourseName(String courseName) {
        List<Session> sessions = sessionRepository.findAllByCourseName(courseName);
        List<SessionDto> sessionDtos = sessions.stream().map(session -> new SessionDto(session.getDay(), session.getStartTime(),
                session.getEndTime(), session.getLink(), session.getCategory())).toList();
        return sessionDtos;
    }

    public List<Session> getSessionsbySessionsName(List<String> sessionsName) {
        return sessionRepository.findAllBySessionNameIn(sessionsName);
    }


}
