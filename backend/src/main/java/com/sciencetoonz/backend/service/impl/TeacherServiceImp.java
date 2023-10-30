package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.TeacherRepo;
import com.sciencetoonz.backend.dto.TeacherDto;
import com.sciencetoonz.backend.model.Teacher;
import com.sciencetoonz.backend.service.TeacherService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TeacherServiceImp implements TeacherService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private TeacherRepo teacherRepo;

    public void saveTeacher(TeacherDto teacherDto) {
        Teacher teacher = modelMapper.map(teacherDto, Teacher.class);
        System.out.println(teacher);
        teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));
        teacherRepo.save(teacher);
    }

}
