package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.CourseRepository;
import com.sciencetoonz.backend.dto.CourseDto;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Teacher;
import com.sciencetoonz.backend.service.CourseService;
import lombok.val;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {


    private final ModelMapper modelMapper;
    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository, ModelMapper modelMapper) {
        this.courseRepository = courseRepository;
        this.modelMapper = modelMapper;
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

    public List<Course> getCourses(Long teacherId) {
         return courseRepository.findAllByTeacherId(teacherId);
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



}
