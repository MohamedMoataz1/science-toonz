package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.CourseRepository;
import com.sciencetoonz.backend.dto.CourseDto;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Teacher;
import com.sciencetoonz.backend.service.CourseService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl implements CourseService {


    private final ModelMapper modelMapper;
    private CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository, ModelMapper modelMapper) {
        this.courseRepository = courseRepository;
        this.modelMapper = modelMapper;
    }

    public Course createCourse(CourseDto courseDto, Teacher teacher) {
        Course course = modelMapper.map(courseDto, Course.class);
        course.setTeacher(teacher);
        System.out.println(course);
        courseRepository.save(course);
        return course;
    }
}
