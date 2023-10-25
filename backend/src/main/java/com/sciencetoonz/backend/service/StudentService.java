package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.model.Student;

import java.util.List;

public interface StudentService {

    public void addStudent(StudentDto studentDto);
    public List<Student> getStudentsByCourseName(String courseName);
    public String addStudentToCourse(String studentEmail, String courseName);
    public String addSessionsToStudent(String studentEmail, List<Long> sessions);
}
