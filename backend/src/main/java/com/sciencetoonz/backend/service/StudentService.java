package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.StudentDto;
import org.springframework.security.core.Authentication;

public interface StudentService {

    public void addStudent(StudentDto studentDto);
}
