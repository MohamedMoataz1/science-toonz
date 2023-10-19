package com.sciencetoonz.backend.service;

import com.sciencetoonz.backend.dto.SessionDto;
import com.sciencetoonz.backend.model.Session;

public interface SessionService {
    public Session createSession(SessionDto sessionDto, String courseName);
}
