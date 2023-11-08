package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.CourseRepository;
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
import com.sciencetoonz.backend.service.SessionService;
import com.sciencetoonz.backend.service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    private final ModelMapper modelMapper;
    private final CourseRepository courseRepository;
    private final StudentService studentService;
    private final SessionService sessionService;

    public CourseServiceImpl(ModelMapper modelMapper, CourseRepository courseRepository, @Lazy StudentService studentService, @Lazy SessionService sessionService) {
        this.modelMapper = modelMapper;
        this.courseRepository = courseRepository;
        this.studentService = studentService;
        this.sessionService = sessionService;
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

    public List<CourseDto> getCoursesOfTeacher(Long teacherId) {
         List<Course> courses = courseRepository.findAllByTeacherId(teacherId);
         List<CourseDto> courseDtos = courses.stream().map(course -> new CourseDto(
                 course.getId(),
                 course.getName(),
                 course.getStartDate(),
                 course.getEndDate(),
                 course.getNumOfCategories(),
                 course.getMaterialLink()
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

        List<StudentDto> studentDtos = studentService.getStudentsByCourseId(course.getId());


        List<SessionDto> sessionDtos = sessionService.getSessionsByCourseId(course.getId());

        CourseDetailsDto courseDetailsDto = new CourseDetailsDto(course.getId(),
                course.getName(),
                course.getStartDate(),
                course.getEndDate(),
                course.getNumOfCategories(),
                course.getMaterialLink(),
                studentDtos,
                sessionDtos);
        return courseDetailsDto;
    }

    @Override
    public String editCourse(Long courseId, CourseDto courseDto) {
        Optional<Course> courseOptional = courseRepository.findById(courseId);
        if(!courseOptional.isPresent()) {
            throw ApiError.notFound("Course not found");
        }
        Course savedCourse = courseRepository.findByName(courseDto.getName());
        if(savedCourse != null) {
            throw ApiError.badRequest("Course already exists with this name");
        }
        Course course = courseOptional.get();
        course.setName(courseDto.getName());
        course.setStartDate(courseDto.getStartDate());
        course.setEndDate(courseDto.getEndDate());
        course.setNumOfCategories(courseDto.getNumOfCategories());
        course.setMaterialLink(courseDto.getMaterialLink());
        courseRepository.save(course);
        return "Course Updated";
    }

    @Override
    public void save(Course course) {
        courseRepository.save(course);
    }

    @Override
    public String deleteCourse(Long courseId) {
        Optional<Course> savedCourse = courseRepository.findById(courseId);
        if(!savedCourse.isPresent()) {
            throw ApiError.notFound("Course not found!");
        }
        Course course = savedCourse.get();
        sessionService.deleteSessions(course.getSessions());
        courseRepository.delete(course);
        return "Course deleted!";
    }

    @Override
    public List<CourseDto> getCoursesOfStudent(Long studentId) {
        Student student = studentService.getStudentById(studentId);
        List<Course> courses = courseRepository.findAllByStudents(student);
        List<CourseDto> courseDtos = courses.stream().map(course -> new CourseDto(course.getId(),
                course.getName(),
                course.getStartDate(),
                course.getEndDate(),
                course.getNumOfCategories(),
                course.getMaterialLink())).toList();
        return courseDtos;
    }


}