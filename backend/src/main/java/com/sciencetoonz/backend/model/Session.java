package com.sciencetoonz.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(nullable = false)
    private String day;

    @NotEmpty
    @Column(nullable = false)
    private Time startTime;

    @NotEmpty
    @Column(nullable = false)
    private Time endTime;

    @NotEmpty
    @Column(nullable = false)
    private String link;

    @NotEmpty
    @Column(nullable = false)
    private int category;

    @ManyToOne
    private Course course;

    @ManyToMany(mappedBy = "sessions")
    private List<Student> students;

}
