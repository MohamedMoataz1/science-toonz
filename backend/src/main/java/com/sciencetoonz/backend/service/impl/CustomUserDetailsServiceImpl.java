package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.StudentRepo;
import com.sciencetoonz.backend.Repository.TeacherRepo;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.model.Teacher;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final TeacherRepo teacherRepo;
    private final StudentRepo studentRepo;

    public CustomUserDetailsServiceImpl(TeacherRepo teacherRepo, StudentRepo studentRepo) {
        this.teacherRepo = teacherRepo;
        this.studentRepo = studentRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.contains("admin")) {
            return teacherRepo.findByEmail(username);
        } else {
            Optional<Student> studentOptional = Optional.ofNullable(studentRepo.findByEmail(username));
            Student student = studentOptional.orElseThrow(() -> new UsernameNotFoundException("User not found"));
            Student student1 = Student.builder()
                    .id(student.getId())
                    .firstName(student.getFirstName())
                    .lastName(student.getLastName())
                    .firstName(student.getFatherName())
                    .schoolName(student.getSchoolName())
                    .email(student.getEmail())
                    .password(student.getPassword())
                    .officialEmail(student.getOfficialEmail())
                    .year(student.getYear())
                    .fees(student.getFees())
                    .build();
            return student1;
        }
    }

}
