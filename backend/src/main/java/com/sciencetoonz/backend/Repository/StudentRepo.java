package com.sciencetoonz.backend.Repository;

import com.sciencetoonz.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student,Long> {

    public Student findByEmail(String username);

}
