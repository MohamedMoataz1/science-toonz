package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.CourseDto;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Teacher;

public interface CourseService {
    public Course createCourse(CourseDto courseDto, Teacher teacher);
}
