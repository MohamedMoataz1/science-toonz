package com.sciencetoonz.backend.Repository;

import com.sciencetoonz.backend.dto.StudentDto;
import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student,Long> {

    public Student findByEmail(String email);
    public List<Student> findAllByCoursesId(Long courseId);
    public List<Student> findStudentsByCoursesContains(Course course);
}
