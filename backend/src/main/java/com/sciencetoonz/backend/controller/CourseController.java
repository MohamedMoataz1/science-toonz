package com.sciencetoonz.backend.controller;

import com.sciencetoonz.backend.dto.CourseDetailsDto;
import com.sciencetoonz.backend.dto.CourseDto;
import com.sciencetoonz.backend.dto.StudentBulkDto;
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
@RequestMapping("/api/courses")
public class CourseController {

    private CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("/")
    public ResponseEntity<String> createCourse(@RequestBody CourseDto courseDto, Authentication authentication) {

        Teacher teacher = (Teacher) AuthenticationUser.get(authentication);
        Course course = courseService.createCourse(courseDto, teacher);
        return ResponseEntity.status(HttpStatus.CREATED).body("Course created with id = "+ course.getId());
    }

    @GetMapping("/")
    public ResponseEntity<List<CourseDto>> getCoursesOfTeacher(Authentication authentication) {
        Teacher teacher = (Teacher) AuthenticationUser.get(authentication);
        Long teacherId = teacher.getId();
        return ResponseEntity.ok(courseService.getCoursesOfTeacher(teacherId));
    }

    @GetMapping("/courseDetails/{courseId}")
    public ResponseEntity<CourseDetailsDto> getCourseDetailsById(@PathVariable("courseId") Long courseId) {
        CourseDetailsDto course = courseService.findCourseDetailsById(courseId);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/courseDetailsFiltered/{courseId}")
    public ResponseEntity<CourseDetailsDto> getCourseDetailsFilteredById(@PathVariable("courseId") Long courseId) {
        CourseDetailsDto course = courseService.findCourseDetailsFilteredById(courseId);
        return ResponseEntity.ok(course);
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<String> editCourse(@PathVariable("courseId") Long courseId,
                                             @Valid @RequestBody CourseDto courseDto) {
        String success = courseService.editCourse(courseId,courseDto);
        return ResponseEntity.ok(success);
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<String> deleteCourse(@PathVariable("courseId") Long courseId) {
        String success = courseService.deleteCourse(courseId);
        return ResponseEntity.ok(success);
    }

    @PostMapping("/{courseId}/students/{studentEmail}/sessions")
    public ResponseEntity<String> addStudentToCourseWithSessions(@PathVariable("courseId") Long courseId, @PathVariable("studentEmail") String studentEmail,
                                                                 @RequestBody List<Long> sessionsIds) {
        String success = courseService.addStudentToCourseWithSessions(studentEmail, courseId, sessionsIds);
        return ResponseEntity.ok(success);
    }

    @DeleteMapping("/{courseId}/students/{studentId}")
    public ResponseEntity<String> removeStudentFromCourse(@PathVariable("courseId") Long courseId,
                                                          @PathVariable("studentId") Long studentId) {
        String success = courseService.removeStudentFromCourse(studentId, courseId);
        return ResponseEntity.ok(success);
    }

    @GetMapping("/merge/{deletedCourseId}/{mainCourseId}")
    public ResponseEntity<String> mergeCourses(@PathVariable("deletedCourseId") Long deletedCourseId,
                                               @PathVariable("mainCourseId") Long mainCourseId) {
        return ResponseEntity.ok(courseService.mergeCourses(deletedCourseId, mainCourseId));
    }

    @PostMapping("/bulkStudents/{courseId}")
    public ResponseEntity<String> addStudentsToCourse(@PathVariable Long courseId, @RequestBody List<StudentBulkDto> studentBulkDtos) {
        courseService.addStudentsToCourse(courseId, studentBulkDtos);
        return ResponseEntity.ok("Students added to the course successfully");
    }

}
