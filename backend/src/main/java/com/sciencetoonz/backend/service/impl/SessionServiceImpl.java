package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.SessionRepository;
import com.sciencetoonz.backend.dto.CourseDto;
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
import java.util.Optional;

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
        session.setSessionName(course.getName()+dayS+timeS);
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
                session.getEndTime(),session.getDate().substring(0,10), session.getLink(), session.getCategory(), session.getVimeoLink())).toList();
        return sessionDtos;
    }

    @Override
    public List<Session> getSessionsbySessionsIds(List<Long> sessionsIds) {
        return sessionRepository.findAllByIdIn(sessionsIds);
    }

    @Override
    public String addSessionsToStudent(String studentEmail,Long courseId, List<Long> sessionsIds) {
        Course course = courseService.findById(courseId);
        Student student = studentService.getStudentByEmail(studentEmail);
        if(student == null) {
            throw ApiError.notFound("Student Not Found");
        }

        if(!student.getCourses().contains(course)) {
            throw ApiError.notFound("This student is not registered to this course!");
        }
        if(course.getNumOfCategories() != sessionsIds.size()) {
            throw ApiError.badRequest("Number of sessions is not enough to this course");
        }



        List<Session> sessions = getSessionsbySessionsIds(sessionsIds);

        if(sessions.stream().count()==0) {
            throw ApiError.notFound("No sessions with those ids");
        }

        for(int i = 0;i<course.getNumOfCategories();i++) {
            if (sessions.get(i).getCategory() != i+1) {
                throw ApiError.badRequest("Arrangement of session categories is not valid!");
            }
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
    public String updateCourseSession(Long sessionId, SessionDto sessionDto) {
        Optional<Session> optionalSession = sessionRepository.findById(sessionId);
        if(!optionalSession.isPresent()) {
            throw ApiError.notFound("Session you want to update not found!");
        }
        Session session = optionalSession.get();
        session.setDay(sessionDto.getDay());
        session.setStartTime(sessionDto.getStartTime());
        session.setEndTime(sessionDto.getEndTime());
        session.setDate(sessionDto.getDate());
        session.setLink(sessionDto.getLink());
        session.setCategory(sessionDto.getCategory());
        session.setVimeoLink(sessionDto.getVimeoLink());
        String dayS = session.getDay().substring(0,3).toLowerCase();
        String timeS = session.getStartTime().toString().substring(0,2).toLowerCase();
        session.setSessionName(session.getCourse().getName()+dayS+timeS);
        sessionRepository.save(session);
        return "Session Updated Successfully!";
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
                session.getCategory(),
                session.getVimeoLink())).toList();
        return sessionDtos;
    }

    @Override
    public String removeSessionsOfCourseOfStudent(Long studentId, Long courseId) {
        Student student = studentService.getStudentById(studentId);
        List<Session> sessions = sessionRepository.findByStudentsAndCourseId(student,courseId);
        student.getSessions().removeAll(sessions);
        return "A number of " + sessions.size() + " Sessions deleted";
    }

    @Override
    public String updateSessionsOfStudent(Long studentId, long courseId, List<Long> sessionIds) {
        System.out.println(removeSessionsOfCourseOfStudent(studentId,courseId));
        Student student = studentService.getStudentById(studentId);
        System.out.println(addSessionsToStudent(student.getEmail(),courseId,sessionIds));
        return "Sessions Updated Successfully";
    }

    @Override
    public String deleteSession(Long sessionId) {
        Optional<Session> optionalSession = sessionRepository.findById(sessionId);
        if(!optionalSession.isPresent()) {
            throw ApiError.notFound("Session not found");
        }
        sessionRepository.deleteById(sessionId);
        return "Session Deleted";
    }
}