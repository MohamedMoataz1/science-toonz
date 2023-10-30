package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.model.Student;

import java.util.List;

public interface StudentService {

    public void addStudent(StudentDto studentDto);
    public String addStudentToCourse(String studentEmail, Long courseId);
    public String addSessionsToStudent(String studentEmail, List<Long> sessions);
    public List<StudentDto> getStudentsByCourseId(Long courseId);
}
