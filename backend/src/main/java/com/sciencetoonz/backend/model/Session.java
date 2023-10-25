package com.sciencetoonz.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

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
    private String sessionName;

    @NotEmpty
    @Column(nullable = false)
    private Time startTime;

    @NotEmpty
    @Column(nullable = false)
    private Time endTime;

    @NotEmpty
    @Column(nullable = false)
    private String date;

    @NotEmpty
    @Column(nullable = false)
    private String link;

    @NotEmpty
    @Column(nullable = false)
    private int category;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
