package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.CourseRepository;
import com.sciencetoonz.backend.Repository.SessionRepository;
import com.sciencetoonz.backend.dto.SessionDto;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Session;
import com.sciencetoonz.backend.service.SessionService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class SessionServiceImpl implements SessionService {

    private SessionRepository sessionRepository;
    private ModelMapper modelMapper;
    private CourseRepository courseRepository;

    public SessionServiceImpl(SessionRepository sessionRepository, ModelMapper modelMapper, CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
        this.modelMapper = modelMapper;
        this.sessionRepository = sessionRepository;
    }

    public Session createSession(SessionDto sessionDto, String courseName) {
        Session session = modelMapper.map(sessionDto, Session.class);
        Course course = courseRepository.findByName(courseName);
        session.setCourse(course);
        sessionRepository.save(session);
        return session;
    }
}
