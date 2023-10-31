package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.model.Student;

import java.util.List;

public interface StudentService {

    public void addStudent(StudentDto studentDto);
//    public String addStudentToCourse(String studentEmail, Long courseId);
//    public String addSessionsToStudentsionsToStudent(String studentEmail, List<Long> sessions);
    public List<StudentDto> getStudentsByCourseId(Long courseId);

    public String addStudentToCourseWithSessions(String studentEmail, Long courseId, List<Long> sessionsIds);

    public Student getStudentById(Long studentId);
    public Student getStudentByEmail(String studentEmail);

    public void saveStudent(Student student);
}
