package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.exceptions;

import java.time.LocalDateTime;

public record ExceptionResponse(LocalDateTime timestamp,
                                String message,
                                String details) {

}