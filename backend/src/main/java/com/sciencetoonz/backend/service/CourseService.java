package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.CourseDetailsDto;
import com.sciencetoonz.backend.dto.StudentBulkDto;
import com.sciencetoonz.backend.dto.CourseDto;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Teacher;

import java.util.List;

public interface CourseService {
    public Course createCourse(CourseDto courseDto, Teacher teacher);
    public List<CourseDto> getCoursesOfTeacher(Long teacherId);
    public Course findById(Long courseId);
    public CourseDetailsDto findCourseDetailsById(Long courseId);
    public CourseDetailsDto findCourseDetailsFilteredById(Long courseId);
    public String editCourse(Long courseId, CourseDto courseDto);
    public String addStudentToCourseWithSessions(String studentEmail, Long courseId, List<Long> sessionsIds);
    public String removeStudentFromCourse(Long studentId, Long courseId);
    public String deleteCourse(Long courseId);
    public List<CourseDto> getCoursesOfStudent(Long studentId);
    public String mergeCourses(Long deletedCourseId, Long mainCourseId);
    public String addStudentsToCourse(Long courseId, List<StudentBulkDto> studentBulkDtos);
}
