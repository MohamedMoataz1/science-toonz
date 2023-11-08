package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.CourseDetailsDto;
import com.sciencetoonz.backend.dto.CourseDto;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Teacher;

import java.util.List;

public interface CourseService {
    public Course createCourse(CourseDto courseDto, Teacher teacher);
    public List<CourseDto> getCoursesOfTeacher(Long teacherId);
    public Course findByName(String courseName);
    public Course findById(Long courseId);
    public CourseDetailsDto findCourseDetailsById(Long courseId);
    public String editCourse(Long courseId, CourseDto courseDto);
    public void save(Course course);
    public String deleteCourse(Long courseId);
    public List<CourseDto> getCoursesOfStudent(Long studentId);
}
