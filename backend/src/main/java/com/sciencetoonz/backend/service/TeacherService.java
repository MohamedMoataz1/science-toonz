package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.TeacherDto;
import com.sciencetoonz.backend.model.Teacher;

public interface TeacherService {
    public void saveTeacher(TeacherDto teacherDto);
}
