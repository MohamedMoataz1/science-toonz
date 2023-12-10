package com.sciencetoonz.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sciencetoonz.backend.model.Session;
import com.sciencetoonz.backend.model.Student;
import com.sciencetoonz.backend.model.Teacher;
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
public class CourseDto {

    private long id;
    private String name;
    private Date startDate;
    private Date endDate;
    private Long numOfCategories;
    private String materialLink;
}
