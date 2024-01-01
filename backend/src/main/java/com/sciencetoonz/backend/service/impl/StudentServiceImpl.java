package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.StudentRepository;
import com.sciencetoonz.backend.dto.*;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.service.CourseService;
import com.sciencetoonz.backend.service.SessionService;
import com.sciencetoonz.backend.service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final CourseService courseService;
    private final StudentRepository studentRepository;
    private final SessionService sessionService;

    public StudentServiceImpl(PasswordEncoder passwordEncoder, ModelMapper modelMapper, CourseService courseService, StudentRepository studentRepository, SessionService sessionService) {
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.courseService = courseService;
        this.studentRepository = studentRepository;
        this.sessionService = sessionService;
    }

    @Override
    public String addStudent(StudentDto studentDto) {

        Student savedStudent = studentRepository.findBySerial(studentDto.getSerial());
        if(savedStudent != null) {
            throw ApiError.badRequest("A student is registered before with this serial!\n" +
                    "Suggested to be in this format coursename+numbers");
        }

        savedStudent = studentRepository.findByEmail(studentDto.getEmail());
        if( savedStudent != null) {
            throw ApiError.badRequest("A student is registered before with this email!");
        }

        Student student = modelMapper.map(studentDto, Student.class);
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        studentRepository.save(student);
        return "Student Added Successfully";
    }

    @Override
    public List<StudentDto> getStudentsDtoByCourseId(Long courseId) {
        List<Student> students = studentRepository.findAllByCoursesId(courseId);
        List<StudentDto> studentDtos = students.stream().map(student -> new StudentDto(
                student.getId(),
                student.getSerial(),
                student.getFirstName(),
                student.getFatherName(),
                student.getLastName(),
                student.getArabic(),
                student.getOfficialEmail(),
                student.getEmail(),
                student.getPassword(),
                student.getStudentNumber(),
                student.getParentNumber(),
                student.getClassEmail(),
                student.getClassName(),
                student.getSchoolName(),
                student.getGender(),
                student.getYear(),
                student.getFees(),
                student.getFirstInstalment(),
                student.getSecondInstalment(),
                student.getPaymentNotes()
        )).toList();
        return studentDtos;
    }

    @Override
    public List<Student> getStudentsByCourseId(Long courseId) {
        return studentRepository.findAllByCoursesId(courseId);
    }

    @Override
    public Student getStudentById(Long studentId) {
        Optional<Student> student = studentRepository.findById(studentId);
        if (!student.isPresent()) {
            throw ApiError.notFound("Student not found!");
        }
        return student.get();
    }

    @Override
    public Student getStudentByEmail(String studentEmail) {
        return studentRepository.findByEmail(studentEmail);
    }

    @Override
    public void saveStudent(Student student) {
        studentRepository.save(student);
    }

    @Override
    public StudentDetailsDto getStudentDetails(Long studentId) {
        Student student = getStudentById(studentId);
        List<CourseDto> courseDtos = courseService.getCoursesOfStudent(studentId);
        List<CoursesWithSessionsOfStudentDto> coursesWithSessionsOfStudentDtos = courseDtos.stream().map(courseDto -> new CoursesWithSessionsOfStudentDto(courseDto.getId(),
                courseDto.getName(),
                courseDto.getStartDate(),
                courseDto.getEndDate(),
                courseDto.getActive(),
                courseDto.getNumOfCategories(),
                courseDto.getMaterialLink(),
                sessionService.getFilteredSessionsOfCourseOfStudent(studentId,courseDto.getId()))).toList();
        StudentDetailsDto studentDetailsDto = new StudentDetailsDto(
                student.getId(),
                student.getSerial(),
                student.getFirstName(),
                student.getFatherName(),
                student.getLastName(),
                student.getArabic(),
                student.getOfficialEmail(),
                student.getEmail(),
                student.getPassword(),
                student.getStudentNumber(),
                student.getParentNumber(),
                student.getClassEmail(),
                student.getFirstName(),
                student.getSchoolName(),
                student.getGender(),
                student.getYear(),
                student.getFees(),
                student.getFirstInstalment(),
                student.getSecondInstalment(),
                student.getPaymentNotes(),
                coursesWithSessionsOfStudentDtos
        );
        return studentDetailsDto;
    }

    @Override
    public List<StudentDto> getStudentsWithoutCourse(Long courseId) {
        Course course = courseService.findById(courseId);
        if (course == null) {
            throw ApiError.notFound("Course Not Found!");
        }
        List<Student> students = studentRepository.findStudentsNotInCourse(course);
        List<StudentDto> studentDtos = students.stream().map(student -> new StudentDto(
                student.getId(),
                student.getSerial(),
                student.getFirstName(),
                student.getFatherName(),
                student.getLastName(),
                student.getArabic(),
                student.getOfficialEmail(),
                student.getEmail(),
                student.getPassword(),
                student.getStudentNumber(),
                student.getParentNumber(),
                student.getClassEmail(),
                student.getClassName(),
                student.getSchoolName(),
                student.getGender(),
                student.getYear(),
                student.getFees(),
                student.getFirstInstalment(),
                student.getSecondInstalment(),
                student.getPaymentNotes()
        )).toList();
        return studentDtos;
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        List<StudentDto> studentDtos = students.stream().map(student -> new StudentDto(
                student.getId(),
                student.getSerial(),
                student.getFirstName(),
                student.getFatherName(),
                student.getLastName(),
                student.getArabic(),
                student.getOfficialEmail(),
                student.getEmail(),
                student.getPassword(),
                student.getStudentNumber(),
                student.getParentNumber(),
                student.getClassEmail(),
                student.getClassName(),
                student.getSchoolName(),
                student.getGender(),
                student.getYear(),
                student.getFees(),
                student.getFirstInstalment(),
                student.getSecondInstalment(),
                student.getPaymentNotes()
        )).toList();
        return studentDtos;
    }

}
