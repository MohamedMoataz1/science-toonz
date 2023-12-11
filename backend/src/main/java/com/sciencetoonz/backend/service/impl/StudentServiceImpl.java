package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.StudentRepo;
import com.sciencetoonz.backend.dto.*;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Session;
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
    private final StudentRepo studentRepo;
    private final SessionService sessionService;

    public StudentServiceImpl(PasswordEncoder passwordEncoder, ModelMapper modelMapper, CourseService courseService, StudentRepo studentRepo, SessionService sessionService) {
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.courseService = courseService;
        this.studentRepo = studentRepo;
        this.sessionService = sessionService;
    }

    @Override
    public void addStudent(StudentDto studentDto) {

        Student savedStudent = studentRepo.findBySerial(studentDto.getSerial());
        if(savedStudent != null) {
            throw ApiError.badRequest("A student is registered before with this serial!\n" +
                    "Suggested to be in this format coursename+numbers");
        }

        savedStudent = studentRepo.findByEmail(studentDto.getEmail());
        if( savedStudent != null) {
            throw ApiError.badRequest("A student is registered before with this email!");
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
    public String addStudentToCourseWithSessions(String studentEmail, Long courseId, List<Long> sessionsIds) {
        System.out.println(studentEmail);
        Student student = studentRepo.findByEmail(studentEmail);
        if(student == null) {
            throw ApiError.notFound("Student not found!");
        }

        Course course = courseService.findById(courseId);
        if(course == null) {
            throw ApiError.notFound("Course not found!");
        }

        List<Course> studentCourses = student.getCourses();
        if (studentCourses.contains(course)){
            throw ApiError.badRequest("Student Already Assigned to this course before!");
        }

//        if(course.getNumOfCategories() != sessionsIds.size()) {
//            throw ApiError.badRequest("Number of sessions is not enough to this course");
//        }

//        for(int i = 0;i<course.getNumOfCategories();i++) {
//            if (sessionsIds.get(i) != i+1) {
//                throw ApiError.badRequest("Arrangement of session categories is not valid!");
//            }
//        }

        studentCourses.add(course);
        List<Session> sessions = sessionService.getSessionsbySessionsIds(sessionsIds);
        if(sessions.stream().count()==0) {
            throw ApiError.notFound("No sessions with those ids");
        }

        if(sessions.size() != sessionsIds.size()) {
            throw ApiError.notFound("There are sessions could not be found!");
        }

        for(Session session:sessions) {
            if (session.getCourse()!=course) {
                throw ApiError.badRequest("The Session \""+ session.getDay() + "\" is not related to this course");
            }
        }

        List<Session> sessionList = student.getSessions();
        boolean hasOverlap = sessions.stream().anyMatch(sessionList::contains);
        if(hasOverlap) {
            throw ApiError.badRequest("There is a session already assigned before");
        }
        sessionList.addAll(sessions);
        studentRepo.save(student);
        return sessions.size() + " sessions added to " + student.getFirstName() +
                " with Course " + course.getName();
    }

    @Override
    public Student getStudentById(Long studentId) {
        Optional<Student> student = studentRepo.findById(studentId);
        if (!student.isPresent()) {
            throw ApiError.notFound("Student not found!");
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

    @Override
    public String removeStudentFromCourse(Long studentId, Long courseId) {
        Optional<Student> savedStudent = studentRepo.findById(studentId);
        if(!savedStudent.isPresent()) {
            throw ApiError.notFound("Student Not Found!");
        }
        Student student = savedStudent.get();
        Course course = courseService.findById(courseId);

        if(!course.getStudents().contains(student)) {
            throw ApiError.notFound("Student is not registered to this course!");
        }

        course.getStudents().remove(student);
        System.out.println(sessionService.removeSessionsOfCourseOfStudent(studentId,courseId));
        courseService.save(course);
        saveStudent(student);
        return "Student "+student.getEmail()+" removed from course "+course.getName();
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
                sessionService.getSessionsOfCourseOfStudent(studentId,courseDto.getId()))).toList();
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
        List<Student> students = studentRepo.findStudentsNotInCourse(course);
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
        List<Student> students = studentRepo.findAll();
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
