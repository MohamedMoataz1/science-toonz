package com.sciencetoonz.backend.Repository;

import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepo extends JpaRepository<Student,Long> {

    public Student findByEmail(String username);

    public List<Student> findAllByCoursesName(String courseName);
}
