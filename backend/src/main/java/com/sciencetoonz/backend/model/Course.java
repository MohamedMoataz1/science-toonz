package com.sciencetoonz.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
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

    @NotEmpty
    @Column(nullable = false)
    @JsonFormat(pattern = "MM/dd/yyyy")
    private Date startDate;

    @NotEmpty
    @Column(nullable = false)
    @JsonFormat(pattern = "MM/dd/yyyy")
    private Date endDate;

    @NotEmpty
    @Column(nullable = false)
    private Long numOfCategories;

    @NotEmpty
    @Column(nullable = false)
    private String materialLink;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;


    @ManyToMany
    @JoinTable(
            name = "students_courses",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<Student> students;

    @OneToMany
    @JoinColumn(name = "course_id")
    private List<Session> sessions;

    @OneToMany
    @JoinColumn(name = "course_id")
    private List<VimeoSession> vimeoSessions;
}
