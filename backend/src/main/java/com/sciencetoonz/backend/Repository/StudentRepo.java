package com.sciencetoonz.backend.Repository;

import com.sciencetoonz.backend.model.Course;
import com.sciencetoonz.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepo extends JpaRepository<Student,Long> {

    public Student findByEmail(String email);
    public List<Student> findAllByCoursesId(Long courseId);
    @Query("SELECT s FROM Student s WHERE :course NOT MEMBER OF s.courses")
    List<Student> findStudentsNotInCourse(@Param("course") Course course);

}
