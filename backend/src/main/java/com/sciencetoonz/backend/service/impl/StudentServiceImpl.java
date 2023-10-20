package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.StudentRepo;
import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.service.CourseService;
import com.sciencetoonz.backend.service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final CourseService courseService;
    private StudentRepo studentRepo;

    public StudentServiceImpl(StudentRepo studentRepo, PasswordEncoder passwordEncoder, ModelMapper modelMapper, CourseService courseService) {
        this.studentRepo = studentRepo;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.courseService = courseService;
    }


    public void addStudent(StudentDto studentDto) {

        Student savedStudent = studentRepo.findByEmail(studentDto.getEmail());
        if( savedStudent != null) {
            throw ApiError.badRequest("This email exists");
        }

        Student student = modelMapper.map(studentDto, Student.class);
        System.out.println(student);
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        studentRepo.save(student);
    }

    public List<Student> getStudentsByCourseName(String courseName) {
        return studentRepo.findAllByCoursesName(courseName);
    }

    public String addStudentToCourse(String studentEmail, String courseName) {
        System.out.println(studentEmail);
        Student student = studentRepo.findByEmail(studentEmail);
        List<Course> studentCourses = student.getCourses();
        Course course = courseService.findByName(courseName);
        if (studentCourses.contains(course)){
            throw ApiError.notFound("Student Already Assigned to this course before");
        }
        studentCourses.add(course);
        studentRepo.save(student);
        return "Course " + courseName + " to "+ student.getFirstName();
    }

}
