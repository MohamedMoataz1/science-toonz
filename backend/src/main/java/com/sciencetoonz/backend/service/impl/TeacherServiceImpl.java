package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.TeacherRepository;
import com.sciencetoonz.backend.dto.TeacherDto;
import com.sciencetoonz.backend.exception.ApiError;
import com.sciencetoonz.backend.model.Teacher;
import com.sciencetoonz.backend.service.TeacherService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TeacherServiceImpl implements TeacherService {
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final TeacherRepository teacherRepository;

    public TeacherServiceImpl(PasswordEncoder passwordEncoder, ModelMapper modelMapper, TeacherRepository teacherRepository) {
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.teacherRepository = teacherRepository;
    }

    public void saveTeacher(TeacherDto teacherDto) {
        Teacher t = teacherRepository.findByEmail(teacherDto.getEmail());
        if(t != null) {
            throw ApiError.badRequest("This email has been registered before!\nPlease choose another email!");
        }
        Teacher teacher = modelMapper.map(teacherDto, Teacher.class);
        System.out.println(teacher);
        teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));
        teacherRepository.save(teacher);
    }

}
