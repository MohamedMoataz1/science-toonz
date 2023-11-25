package com.sciencetoonz.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDetailsDto {

    private long id;
    private String name;
    @JsonFormat(pattern = "MM/dd/yyyy")
    private Date startDate;
    @JsonFormat(pattern = "MM/dd/yyyy")
    private Date endDate;
    private Long numOfCategories;
    private String materialLink;
    private List<StudentWithSessionsDto> studentWithSessionsDtos;
    private List<SessionDto> sessions;
}
