package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.StudentRepo;
import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.service.CourseService;
import com.sciencetoonz.backend.service.SessionService;
import com.sciencetoonz.backend.service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CourseService courseService;
    @Autowired
    private StudentRepo studentRepo;

    @Override
    public void addStudent(StudentDto studentDto) {

        Student savedStudent = studentRepo.findByEmail(studentDto.getEmail());
        if( savedStudent != null) {
            throw ApiError.badRequest("This email exists");
        }

        Student student = modelMapper.map(studentDto, Student.class);
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        studentRepo.save(student);
    }

    @Override
    public List<StudentDto> getStudentsByCourseId(Long courseId) {
        List<Student> students = studentRepo.findAllByCoursesId(courseId);
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
        return studentDtos;
    }

    @Override
    public String addStudentToCourse(String studentEmail, Long courseId) {
        System.out.println(studentEmail);
        Student student = studentRepo.findByEmail(studentEmail);
        if(student == null) {
            throw ApiError.badRequest("You must create a new user koty");
        }

        Course course = courseService.findById(courseId);
        if(course == null) {
            throw ApiError.notFound("Course not found");
        }

        List<Course> studentCourses = student.getCourses();
        if (studentCourses.contains(course)){
            throw ApiError.notFound("Student Already Assigned to this course before");
        }

        studentCourses.add(course);
        studentRepo.save(student);
        return "Course " + course.getName() + " to "+ student.getFirstName();
    }

    @Override
    public Student getStudentById(Long studentId) {
        Optional<Student> student = studentRepo.findById(studentId);
        if (!student.isPresent()) {
            throw ApiError.notFound("Student not found");
        }
        return student.get();
    }

    @Override
    public Student getStudentByEmail(String studentEmail) {
        return studentRepo.findByEmail(studentEmail);
    }

    @Override
    public void saveStudent(Student student) {
        studentRepo.save(student);
    }

}
