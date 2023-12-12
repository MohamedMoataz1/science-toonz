package com.sciencetoonz.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Student implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(nullable = false)
    private String serial;

    @NotEmpty
    @Column(nullable = false)
    private String firstName;

    @NotEmpty
    @Column(nullable = false)
    private String fatherName;

    @NotEmpty
    @Column(nullable = false)
    private String lastName;

    @NotEmpty
    @Column(nullable = false)
    private String arabic;

    @NotEmpty
    @Column(nullable = false)
    private String officialEmail;

    @NotEmpty
    @Column(nullable = false)
    private String email;

    @NotEmpty
    @Column(nullable = false)
    private String password;

    @NotEmpty
    @Column(nullable = false)
    private Long studentNumber;

    @NotEmpty
    @Column(nullable = false)
    private Long parentNumber;

    @NotEmpty
    @Column(nullable = false)
    private String classEmail;

    @NotEmpty
    @Column(nullable = false)
    private String className;

    @NotEmpty
    @Column(nullable = false)
    private String schoolName;

    @NotEmpty
    @Column(nullable = false)
    private String gender;

    @NotEmpty
    @Column(nullable = false)
    private int year;

    @NotEmpty
    @Column(nullable = false)
    private long fees;

    @NotEmpty
    @Column(nullable = false)
    private long firstInstalment;

    @NotEmpty
    @Column(nullable = false)
    private long secondInstalment;

    @NotEmpty
    @Column(nullable = false)
    private String paymentNotes;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "students_courses",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> courses;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "students_sessions",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "session_id")
    )
    private List<Session> sessions;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
