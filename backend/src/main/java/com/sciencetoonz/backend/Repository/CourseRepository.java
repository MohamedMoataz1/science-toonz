package com.sciencetoonz.backend.Repository;

import com.sciencetoonz.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    public Course findByName(String courseName);
    public List<Course> findAllByTeacherId(Long teacherId);
}
