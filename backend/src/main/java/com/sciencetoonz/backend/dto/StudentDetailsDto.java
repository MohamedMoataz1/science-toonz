package com.sciencetoonz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDetailsDto {
    private long id;

    private String firstName;

    private String lastName;

    private String fatherName;

    private String school;

    private String email;

    private String officialEmail;

    private long year;

    private long fees;
    private List<CoursesWithSessionsOfStudentDto> coursesWithSessionsOfStudentDtos;
}
