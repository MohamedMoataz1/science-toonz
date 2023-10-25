package com.sciencetoonz.backend.Repository;

import com.sciencetoonz.backend.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    public List<Session> findAllByCourseName(String courseName);

    public List<Session> findAllBySessionNameIn(List<String> sessionNames);

    public Session findBySessionName(String sessionName);
}
