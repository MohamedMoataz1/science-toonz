package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.CourseRepository;
import com.sciencetoonz.backend.Repository.SessionRepository;
import com.sciencetoonz.backend.Repository.StudentRepo;
import com.sciencetoonz.backend.dto.CourseDetailsDto;
import com.sciencetoonz.backend.dto.CourseDto;
import com.sciencetoonz.backend.dto.SessionDto;
import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Session;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.model.Teacher;
import com.sciencetoonz.backend.service.CourseService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {


    private final ModelMapper modelMapper;
    private final CourseRepository courseRepository;
    private final StudentRepo studentRepo;
    private final SessionRepository sessionRepository;

    public CourseServiceImpl(CourseRepository courseRepository, ModelMapper modelMapper, StudentRepo studentRepo, SessionRepository sessionRepository) {
        this.courseRepository = courseRepository;
        this.modelMapper = modelMapper;
        this.studentRepo = studentRepo;
        this.sessionRepository = sessionRepository;
    }

    public Course createCourse(CourseDto courseDto, Teacher teacher) {
        Course savedCourse = courseRepository.findByName(courseDto.getName());
        if(savedCourse != null) {
            throw ApiError.badRequest("Course already exists with this name");
        }
        Course course = modelMapper.map(courseDto, Course.class);
        course.setTeacher(teacher);
        courseRepository.save(course);
        return course;
    }

    public List<CourseDto> getCourses(Long teacherId) {
         List<Course> courses = courseRepository.findAllByTeacherId(teacherId);
         List<CourseDto> courseDtos = courses.stream().map(course -> new CourseDto(
                 course.getId(),
                 course.getName(),
                 course.getStartDate(),
                 course.getEndDate(),
                 course.getNumOfCategories()
         )).toList();
         return courseDtos;
    }

    public Course findByName(String courseName) {
        return courseRepository.findByName(courseName);
    }

    public Course findById(Long courseId) {
        Optional<Course> course = courseRepository.findById(courseId);
        if (!course.isPresent()) {
            throw ApiError.notFound("Course not found");
        }
        return course.get();
    }

    @Override
    public CourseDetailsDto findCourseDetailsById(Long courseId) {
        Optional<Course> c = courseRepository.findById(courseId);
        if(!c.isPresent()){
            throw ApiError.notFound("Course Not found");
        }

        Course course = c.get();

        List<Student> students = studentRepo.findStudentsByCoursesContains(course);
        List<StudentDto> studentDtos = students.stream().map(student -> new StudentDto(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getFatherName(),
                student.getSchool(),
                student.getEmail(),
                student.getPassword(),
                student.getOfficialEmail(),
                student.getYear(),
                student.getFees()
        )).toList();

        List<Session> sessions = sessionRepository.findSessionsByCourseId(course.getId());
        List<SessionDto> sessionDtos = sessions.stream().map(session -> new SessionDto(
                session.getId(),
                session.getDay(),
                session.getStartTime(),
                session.getEndTime(),
                session.getDate(),
                session.getLink(),
                session.getCategory()
        )).toList();


        CourseDetailsDto courseDetailsDto = new CourseDetailsDto(course.getId(),
                course.getName(),
                course.getStartDate(),
                course.getEndDate(),
                course.getNumOfCategories(),
                studentDtos,
                sessionDtos);
        return courseDetailsDto;
    }


}