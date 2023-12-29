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
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

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

    public Course findByName(String courseName) {
        return courseRepository.findByName(courseName);
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
        Optional<Course> c = courseRepository.findById(courseId);
        if(!c.isPresent()){
            throw ApiError.notFound("Course Not found!");
        }

        Course course = c.get();

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
    public void save(Course course) {
        courseRepository.save(course);
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
    public String addStudentsToCourse(Long courseId, List<StudentBulkDto> studentBulkDtos) {
        Course course = findById(courseId);
        if(course == null) {
            throw ApiError.notFound("Course Not Found");
        }

        for(StudentBulkDto studentBulkDto: studentBulkDtos) {
            StudentDto studentDto = new StudentDto().builder().serial(studentBulkDto.getSerial())
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
                    .fees((studentBulkDto.getFees()))
                    .firstInstalment(studentBulkDto.getFirstInstalment())
                    .secondInstalment(studentBulkDto.getSecondInstalment())
                    .paymentNotes(studentBulkDto.getPaymentNotes()).build();

            if(studentService.getStudentByEmail(studentBulkDto.getEmail()) == null) {
                studentService.addStudent(studentDto);
            }

            if(studentService.getStudentsByCourseId(courseId).contains(studentDto)) {
                throw ApiError.badRequest("Student "+studentDto.getEmail()+" is registered to this course before!");
            }
            List<Long> sessionsIds = studentBulkDto.getSessionsId();
            studentService.addStudentToCourseWithSessions(studentDto.getEmail(),courseId,sessionsIds);

        }
        return "Students added successfully!";

    }
}