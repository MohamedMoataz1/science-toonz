package com.sciencetoonz.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto {
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

}
