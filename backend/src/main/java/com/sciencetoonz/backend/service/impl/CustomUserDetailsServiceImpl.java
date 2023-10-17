package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.StudentRepo;
import com.sciencetoonz.backend.Repository.TeacherRepo;
import com.sciencetoonz.backend.model.Teacher;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private TeacherRepo teacherRepo;
    private StudentRepo studentRepo;

    public CustomUserDetailsServiceImpl(TeacherRepo teacherRepo, StudentRepo studentRepo) {
        this.teacherRepo = teacherRepo;
        this.studentRepo = studentRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if(username.contains("admin")) {
            return teacherRepo.findByEmail(username);
        }

        else {
            return studentRepo.findByEmail(username);
        }

    }
}
