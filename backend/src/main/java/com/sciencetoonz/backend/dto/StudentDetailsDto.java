package com.sciencetoonz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDetailsDto {
    private Long id;

    private String serial;

    private String firstName;

    private String fatherName;

    private String lastName;

    private String arabic;

    private String officialEmail;

    private String email;

    private String password;

    private Long studentNumber;

    private Long parentNumber;

    private String gClassroomEmail;

    private String gClassroomName;

    private String schoolName;

    private String gender;

    private int year;

    private long fees;

    private long firstInstalment;

    private long secondInstalment;

    private String paymentNotes;

    private List<CoursesWithSessionsOfStudentDto> coursesWithSessionsOfStudentDtos;
}
