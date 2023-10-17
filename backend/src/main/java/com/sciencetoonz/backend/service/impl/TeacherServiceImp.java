package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.TeacherRepo;
import com.sciencetoonz.backend.dto.TeacherDto;
import com.sciencetoonz.backend.model.Teacher;
import com.sciencetoonz.backend.service.TeacherService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TeacherServiceImp implements TeacherService {
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private TeacherRepo teacherRepo;

    public TeacherServiceImp(TeacherRepo teacherRepo, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.teacherRepo = teacherRepo;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }
    public void saveTeacher(TeacherDto teacherDto) {
        Teacher teacher = modelMapper.map(teacherDto, Teacher.class);
        System.out.println(teacher);
        teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));
        teacherRepo.save(teacher);
    }
}
