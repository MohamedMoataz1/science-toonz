package com.sciencetoonz.backend.dto;

import com.sciencetoonz.backend.model.Course;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionDto {
    private String day;

    private Time startTime;

    private Time endTime;

    private String link;

    private int category;
}
