package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.CourseRepository;
import com.sciencetoonz.backend.dto.*;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Session;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.model.Teacher;
import com.sciencetoonz.backend.service.CourseService;
import com.sciencetoonz.backend.service.SessionService;
import com.sciencetoonz.backend.service.StudentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    private final ModelMapper modelMapper;
    private final CourseRepository courseRepository;
    private final StudentService studentService;
    private final SessionService sessionService;

    public CourseServiceImpl(ModelMapper modelMapper, CourseRepository courseRepository, @Lazy StudentService studentService, @Lazy SessionService sessionService) {
        this.modelMapper = modelMapper;
        this.courseRepository = courseRepository;
        this.studentService = studentService;
        this.sessionService = sessionService;
    }


    public Course createCourse(CourseDto courseDto, Teacher teacher) {
        Course savedCourse = courseRepository.findByName(courseDto.getName());
        if(savedCourse != null) {
            throw ApiError.badRequest("Course already exists with this name!");
        }
        Course course = modelMapper.map(courseDto, Course.class);
        course.setTeacher(teacher);
        courseRepository.save(course);
        return course;
    }

    public List<CourseDto> getCoursesOfTeacher(Long teacherId) {
         List<Course> courses = courseRepository.findAllByTeacherId(teacherId);
         List<CourseDto> courseDtos = courses.stream().map(course -> new CourseDto(
                 course.getId(),
                 course.getName(),
                 course.getStartDate(),
                 course.getEndDate(),
                 course.getActive(),
                 course.getNumOfCategories(),
                 course.getMaterialLink()
         )).toList();
         return courseDtos;
    }

    public Course findById(Long courseId) {
        Optional<Course> course = courseRepository.findById(courseId);
        if (!course.isPresent()) {
            throw ApiError.notFound("Course not found!");
        }
        return course.get();
    }

    @Override
    public CourseDetailsDto findCourseDetailsById(Long courseId) {
        Optional<Course> savedCourse = courseRepository.findById(courseId);
        if(!savedCourse.isPresent()){
            throw ApiError.notFound("Course Not found!");
        }

        Course course = savedCourse.get();
        List<StudentDto> studentDtos = studentService.getStudentsDtoByCourseId(course.getId());
        List<StudentWithSessionsDto> studentWithSessionsDtos = studentDtos.stream().map(studentDto -> new StudentWithSessionsDto(
                studentDto.getId(),
                studentDto.getSerial(),
                studentDto.getFirstName(),
                studentDto.getFatherName(),
                studentDto.getLastName(),
                studentDto.getArabic(),
                studentDto.getOfficialEmail(),
                studentDto.getEmail(),
                studentDto.getPassword(),
                studentDto.getStudentNumber(),
                studentDto.getParentNumber(),
                studentDto.getClassEmail(),
                studentDto.getClassName(),
                studentDto.getSchoolName(),
                studentDto.getGender(),
                studentDto.getYear(),
                studentDto.getFees(),
                studentDto.getFirstInstalment(),
                studentDto.getSecondInstalment(),
                studentDto.getPaymentNotes(),
                sessionService.getSessionsOfCourseOfStudent(studentDto.getId(),courseId)
        )).toList();

        List<SessionDto> sessionDtos = sessionService.getSessionsDtoByCourseId(course.getId());
        CourseDetailsDto courseDetailsDto = new CourseDetailsDto(course.getId(),
                course.getName(),
                course.getStartDate(),
                course.getEndDate(),
                course.getActive(),
                course.getNumOfCategories(),
                course.getMaterialLink(),
                studentWithSessionsDtos,
                sessionDtos);
        return courseDetailsDto;
    }

    @Override
    public CourseDetailsDto findCourseDetailsFilteredById(Long courseId) {
        Optional<Course> savedCourse = courseRepository.findById(courseId);
        if(!savedCourse.isPresent()){
            throw ApiError.notFound("Course Not found!");
        }

        Course course = savedCourse.get();
        List<StudentDto> studentDtos = studentService.getStudentsDtoByCourseId(course.getId());
        List<StudentWithSessionsDto> studentWithSessionsDtos = studentDtos.stream().map(studentDto -> new StudentWithSessionsDto(
                studentDto.getId(),
                studentDto.getSerial(),
                studentDto.getFirstName(),
                studentDto.getFatherName(),
                studentDto.getLastName(),
                studentDto.getArabic(),
                studentDto.getOfficialEmail(),
                studentDto.getEmail(),
                studentDto.getPassword(),
                studentDto.getStudentNumber(),
                studentDto.getParentNumber(),
                studentDto.getClassEmail(),
                studentDto.getClassName(),
                studentDto.getSchoolName(),
                studentDto.getGender(),
                studentDto.getYear(),
                studentDto.getFees(),
                studentDto.getFirstInstalment(),
                studentDto.getSecondInstalment(),
                studentDto.getPaymentNotes(),
                sessionService.getFilteredSessionsOfCourseOfStudent(studentDto.getId(),courseId)
        )).toList();

        List<SessionDto> sessionDtos = sessionService.getSessionsDtoByCourseId(course.getId());
        CourseDetailsDto courseDetailsDto = new CourseDetailsDto(course.getId(),
                course.getName(),
                course.getStartDate(),
                course.getEndDate(),
                course.getActive(),
                course.getNumOfCategories(),
                course.getMaterialLink(),
                studentWithSessionsDtos,
                sessionDtos);
        return courseDetailsDto;
    }

    @Override
    public String editCourse(Long courseId, CourseDto courseDto) {
        Optional<Course> courseOptional = courseRepository.findById(courseId);
        if(!courseOptional.isPresent()) {
            throw ApiError.notFound("Course not found!");
        }
        Course course = courseOptional.get();
        course.setStartDate(courseDto.getStartDate());
        course.setEndDate(courseDto.getEndDate());
        course.setNumOfCategories(courseDto.getNumOfCategories());
        course.setActive(courseDto.getActive());
        course.setMaterialLink(courseDto.getMaterialLink());
        courseRepository.save(course);
        return "Course Updated";
    }

    @Override
    public String deleteCourse(Long courseId) {
        Optional<Course> savedCourse = courseRepository.findById(courseId);
        if(!savedCourse.isPresent()) {
            throw ApiError.notFound("Course not found!");
        }
        Course course = savedCourse.get();
        sessionService.deleteSessions(course.getSessions());
        courseRepository.delete(course);
        return "Course deleted!";
    }

    @Override
    public List<CourseDto> getCoursesOfStudent(Long studentId) {
        Student student = studentService.getStudentById(studentId);
        List<Course> courses = courseRepository.findAllByStudents(student);
        List<CourseDto> courseDtos = courses.stream().map(course -> new CourseDto(course.getId(),
                course.getName(),
                course.getStartDate(),
                course.getEndDate(),
                course.getActive(),
                course.getNumOfCategories(),
                course.getMaterialLink())).toList();
        return courseDtos;
    }


    @Override
    public String addStudentToCourseWithSessions(String studentEmail, Long courseId, List<Long> sessionsIds) {
        Student student = studentService.getStudentByEmail(studentEmail);
        if(student == null) {
            throw ApiError.notFound("Student not found!");
        }
        Course course = findById(courseId);
        if(course == null) {
            throw ApiError.notFound("Course not found!");
        }

        if(isEmptyString(student.getSerial()) || isEmptyString(student.getFirstName()) || isEmptyString(student.getFatherName())
                || isEmptyString(student.getLastName()) || isEmptyString(student.getArabic()) || isEmptyString(student.getOfficialEmail())
                || isEmptyString(student.getEmail()) || isEmptyString(student.getPassword()) || isEmptyString(String.valueOf(student.getStudentNumber()))
                || isEmptyString(String.valueOf(student.getParentNumber())) || isEmptyString(student.getClassEmail()) || isEmptyString(student.getGender())
                || isEmptyString(String.valueOf(student.getYear()))) {
            throw ApiError.badRequest("Please fill in all required fields (FirstName, LastName, OfficialEmail, StudentNumber, ParentNumber, etc.) of "+student.getEmail());
        }


        List<Course> studentCourses = student.getCourses();
        if (studentCourses.contains(course)){
            throw ApiError.badRequest("Student "+student.getEmail() +" already Assigned to this course before!");
        }
        if(course.getNumOfCategories() != sessionsIds.size()) {
            throw ApiError.badRequest("Number of sessions is not accurate to this course of student "+ studentEmail);
        }

        studentCourses.add(course);
        List<Session> sessions = sessionService.getSessionsbySessionsIds(sessionsIds);
        if(sessions.stream().count()==0) {
            throw ApiError.notFound("No sessions with those ids of student "+studentEmail);
        }

        if(sessions.size() != sessionsIds.size()) {
            throw ApiError.notFound("There are sessions could not be found! student "+studentEmail);
        }
        System.out.println(6);

        for(Session session:sessions) {
            if (session.getCourse()!=course) {
                throw ApiError.badRequest("There is a session is not related to this course of student "+studentEmail);
            }
        }
        System.out.println(7);
        List<Session> studentSessions = student.getSessions();
        //To check if there is a session assigned to before, but it must never execute
        boolean hasOverlap = sessions.stream().anyMatch(studentSessions::contains);
        if(hasOverlap) {
            throw ApiError.badRequest("There is a session already assigned before of student "+studentEmail);
        }
        System.out.println(8);
        studentSessions.addAll(sessions);
        System.out.println(9);
        studentService.saveStudent(student);
        return sessions.size() + " sessions added to " + student.getFirstName() +
                " with Course " + course.getName();
    }

    @Override
    public String removeStudentFromCourse(Long studentId, Long courseId) {
        Student student = studentService.getStudentById(studentId);
        if(student == null) {
            throw ApiError.notFound("Student Not Found!");
        }
        Course course = findById(courseId);

        if(!course.getStudents().contains(student)) {
            throw ApiError.notFound("Student is not registered to this course!");
        }

        course.getStudents().remove(student);
        System.out.println(sessionService.removeSessionsOfCourseOfStudent(studentId,courseId));
        courseRepository.save(course);
        studentService.saveStudent(student);
        return "Student "+student.getEmail()+" removed from course "+course.getName();
    }

    @Override
    public String mergeCourses(Long deletedCourseId, Long mainCourseId) {
        Optional<Course> savedMainCourse = courseRepository.findById(mainCourseId);
        if(!savedMainCourse.isPresent()) {
            throw ApiError.notFound("Course not found!");
        }
        Optional<Course> savedDeletedCourse = courseRepository.findById(deletedCourseId);
        if(!savedDeletedCourse.isPresent()) {
            throw ApiError.notFound("Course not found!");
        }
        Course mainCourse = savedMainCourse.get();
        Course deletedCourse = savedDeletedCourse.get();
        List<Student> students = studentService.getStudentsByCourseId(deletedCourseId);
        List<Session> sessions = sessionService.getSessionsByCourseId(deletedCourseId);
        mainCourse.getSessions().addAll(sessions);
        mainCourse.getStudents().addAll(students);
        courseRepository.save(mainCourse);

        deleteCourse(deletedCourseId);
        return "Course " + deletedCourse.getName() + " merged and deleted to be with " + mainCourse.getName();

    }

    @Override
    @Transactional
    public String addStudentsToCourse(Long courseId, List<StudentBulkDto> studentBulkDtos) {
        Course course = findById(courseId);
        if (course == null) {
            throw ApiError.notFound("Course Not Found");
        }

        for (StudentBulkDto studentBulkDto : studentBulkDtos) {
            System.out.println("student with email: " + studentBulkDto.getEmail());
            StudentDto studentDto = buildStudentDto(studentBulkDto);

            if (studentService.getStudentByEmail(studentBulkDto.getEmail()) == null) {
                studentService.addStudent(studentDto);
            }
            System.out.println("student found "+studentDto.getEmail());
            List<Long> sessionsIds = studentBulkDto.getSessionsId();
            System.out.println("sessions gotten!");
            System.out.println(studentBulkDto);
            String status = addStudentToCourseWithSessions(studentDto.getEmail(), courseId, sessionsIds);
            System.out.println(status);
        }
        return "Students added successfully!";
    }


    private boolean isEmptyString(String str) {
        return str == null || str.trim().isEmpty();
    }

    private StudentDto buildStudentDto(StudentBulkDto studentBulkDto) {
        return StudentDto.builder()
                .serial(studentBulkDto.getSerial())
                .firstName(studentBulkDto.getFirstName())
                .fatherName(studentBulkDto.getFatherName())
                .lastName(studentBulkDto.getLastName())
                .arabic(studentBulkDto.getArabic())
                .officialEmail(studentBulkDto.getOfficialEmail())
                .email(studentBulkDto.getEmail())
                .password(studentBulkDto.getPassword())
                .studentNumber(studentBulkDto.getStudentNumber())
                .parentNumber(studentBulkDto.getParentNumber())
                .classEmail(studentBulkDto.getClassEmail())
                .className(studentBulkDto.getClassName())
                .schoolName(studentBulkDto.getSchoolName())
                .gender(studentBulkDto.getGender())
                .year(studentBulkDto.getYear())
                .fees(studentBulkDto.getFees())
                .firstInstalment(studentBulkDto.getFirstInstalment())
                .secondInstalment(studentBulkDto.getSecondInstalment())
                .paymentNotes(studentBulkDto.getPaymentNotes())
                .build();
    }
}