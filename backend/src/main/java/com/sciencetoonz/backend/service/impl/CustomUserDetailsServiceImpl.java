package com.sciencetoonz.backend.service.impl;

import com.sciencetoonz.backend.Repository.StudentRepository;
import com.sciencetoonz.backend.Repository.TeacherRepository;
import com.sciencetoonz.backend.model.Student;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    public CustomUserDetailsServiceImpl(TeacherRepository teacherRepository, StudentRepository studentRepository) {
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.contains("admin")) {
            return teacherRepository.findByEmail(username);
        } else {
            Optional<Student> studentOptional = Optional.ofNullable(studentRepository.findByEmail(username));
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
