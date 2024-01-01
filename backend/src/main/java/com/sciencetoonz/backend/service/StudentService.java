package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.StudentDetailsDto;
import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.model.Student;

import java.util.List;

public interface StudentService {

    public String addStudent(StudentDto studentDto);
//    public String addStudentToCourse(String studentEmail, Long courseId);
//    public String addSessionsToStudentsionsToStudent(String studentEmail, List<Long> sessions);
    public List<StudentDto> getStudentsDtoByCourseId(Long courseId);
    public List<Student> getStudentsByCourseId(Long courseId);
    public Student getStudentById(Long studentId);
    public Student getStudentByEmail(String studentEmail);
    public void saveStudent(Student student);
    public StudentDetailsDto getStudentDetails(Long studentId);
    public List<StudentDto> getStudentsWithoutCourse(Long courseId);
    public List<StudentDto> getAllStudents();
}
