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
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionServiceImpl implements SessionService {

    private final SessionRepository sessionRepository;
    private final CourseService courseService;
    private final ModelMapper modelMapper;
    private final StudentService studentService;

    public SessionServiceImpl(SessionRepository sessionRepository, CourseService courseService, ModelMapper modelMapper, @Lazy StudentService studentService) {
        this.sessionRepository = sessionRepository;
        this.courseService = courseService;
        this.modelMapper = modelMapper;
        this.studentService = studentService;
    }


    @Override
    public Session createSession(SessionDto sessionDto, Long courseId) {
        Session session = modelMapper.map(sessionDto, Session.class);

        Course course = courseService.findById(courseId);
        if (course == null) {
            throw ApiError.badRequest("This course doesn't exist");
        }

        String dayS = session.getDay().substring(0,3).toLowerCase();
        String timeS = session.getStartTime().toString().substring(0,2).toLowerCase();
        String courseS = course.getName().substring(0,3).toLowerCase();
        session.setSessionName(courseS+dayS+timeS);
        session.setCourse(course);
        Session savedSession = sessionRepository.findBySessionName(session.getSessionName());
        if (savedSession != null) {
            throw ApiError.notFound("This session was added in this course before");
        }

        sessionRepository.save(session);
        return session;
    }

    @Override
    public List<SessionDto> getSessionsByCourseId(Long courseId) {
        List<Session> sessions = sessionRepository.findSessionsByCourseId(courseId);
        List<SessionDto> sessionDtos = sessions.stream().map(session -> new SessionDto(session.getId(),session.getDay(), session.getStartTime(),
                session.getEndTime(),session.getDate().substring(0,10), session.getLink(), session.getCategory())).toList();
        return sessionDtos;
    }

    @Override
    public List<Session> getSessionsbySessionsIds(List<Long> sessionsIds) {
        return sessionRepository.findAllByIdIn(sessionsIds);
    }

    @Override
    public String addSessionsToStudent(String studentEmail, List<Long> sessionsIds) {
        List<Session> sessions = getSessionsbySessionsIds(sessionsIds);
        if(sessions.stream().count()==0) {
            throw ApiError.notFound("No sessions with those ids");
        }
        Student student = studentService.getStudentByEmail(studentEmail);
        if(student == null) {
            throw ApiError.notFound("Student Not Found");
        }

        List<Session> sessionList = student.getSessions();
        boolean hasOverlap = sessions.stream().anyMatch(sessionList::contains);
        if(hasOverlap) {
            throw ApiError.badRequest("There is a session already assigned before");
        }
        sessionList.addAll(sessions);
        studentService.saveStudent(student);
        return sessions.size() + " sessions added to " + student.getFirstName();
    }

    @Override
    public List<SessionDto> getSessionsOfCourseOfStudent(Long studentId, Long courseId) {
        Student student = studentService.getStudentById(studentId);
        List<Session> sessions = sessionRepository.findByStudentsAndCourseId(student,courseId);
        List<SessionDto> sessionDtos = sessions.stream().map(session -> new SessionDto(session.getId(),
                session.getDay(),
                session.getStartTime(),
                session.getEndTime(),
                session.getDate(),
                session.getLink(),
                session.getCategory())).toList();
        return sessionDtos;
    }
}