package com.sciencetoonz.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(nullable = false)
    private String name;

    @ManyToOne
    private Teacher teacher;

    @OneToMany(mappedBy = "course")
    private List<Session> sessions;

    @ManyToMany(mappedBy = "courses")
    private List<Student> students;
}
