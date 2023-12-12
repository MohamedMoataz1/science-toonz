package com.sciencetoonz.backend.controller;

import com.sciencetoonz.backend.dto.CourseDetailsDto;
import com.sciencetoonz.backend.dto.CourseDto;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Teacher;
import com.sciencetoonz.backend.service.CourseService;
import com.sciencetoonz.backend.util.AuthenticationUser;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    private CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("/createCourse")
    public ResponseEntity<String> createCourse(@RequestBody CourseDto courseDto, Authentication authentication) {

        Teacher teacher = (Teacher) AuthenticationUser.get(authentication);
        Course course = courseService.createCourse(courseDto, teacher);
        return ResponseEntity.status(HttpStatus.CREATED).body("Course created with id = "+ course.getId());
    }

    @GetMapping("/getCourses")
    public ResponseEntity<List<CourseDto>> getCoursesOfTeacher(Authentication authentication) {
        Teacher teacher = (Teacher) AuthenticationUser.get(authentication);
        Long teacherId = teacher.getId();
        return ResponseEntity.ok(courseService.getCoursesOfTeacher(teacherId));
    }

    @GetMapping("/getCourseById/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(courseService.findById(id));
    }

    @GetMapping("/getCourseDetailsById/{courseId}")
    public ResponseEntity<CourseDetailsDto> getCourseDetailsById(@PathVariable("courseId") Long courseId) {
        CourseDetailsDto course = courseService.findCourseDetailsById(courseId);
        return ResponseEntity.ok(course);
    }

    @PutMapping("/editCourse/{courseId}")
    public ResponseEntity<String> editCourse(@PathVariable("courseId") Long courseId,
                                             @Valid @RequestBody CourseDto courseDto) {
        String success = courseService.editCourse(courseId,courseDto);
        return ResponseEntity.ok(success);
    }

    @DeleteMapping("/deleteCourse/{courseId}")
    public ResponseEntity<String> deleteCourse(@PathVariable("courseId") Long courseId) {
        String success = courseService.deleteCourse(courseId);
        return ResponseEntity.ok(success);
    }

    @GetMapping("/mergeCourses")
    public ResponseEntity<String> mergeCourses(@RequestParam Long deletedCourseId,
                                               @RequestParam Long mainCourseId) {
        return ResponseEntity.ok(courseService.mergeCourses(deletedCourseId, mainCourseId));
    }

}
