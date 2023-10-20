package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.StudentRepo;
import com.sciencetoonz.backend.Repository.TeacherRepo;
import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.dto.TeacherDto;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.model.Teacher;
import com.sciencetoonz.backend.service.StudentService;
import com.sciencetoonz.backend.util.AuthenticationUser;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private StudentRepo studentRepo;

    public StudentServiceImpl(StudentRepo studentRepo, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.studentRepo = studentRepo;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }


    public void addStudent(StudentDto studentDto) {

        Student savedStudent = studentRepo.findByEmail(studentDto.getEmail());
        if( savedStudent != null) {
            throw ApiError.badRequest("This email exists");
        }

        Student student = modelMapper.map(studentDto, Student.class);
        System.out.println(student);
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        studentRepo.save(student);
    }
}
