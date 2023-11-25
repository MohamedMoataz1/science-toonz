package com.sciencetoonz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentWithSessionsDto {
    private long id;

    private String firstName;

    private String lastName;

    private String fatherName;

    private String school;

    private String email;

    private String password;

    private String officialEmail;

    private long year;

    private long fees;

    private List<SessionDto> sessionDtos;

}
