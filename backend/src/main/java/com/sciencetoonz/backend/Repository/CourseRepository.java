package com.sciencetoonz.backend.Repository;

import com.sciencetoonz.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
