package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Easy static methods and wrappers for error responses
 */
public class Errors {
    public static ResponseEntity<Error> Response403Forbidden(String message) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Error(message));
    }

    public static ResponseEntity<Error> Response404NotFound(String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Error(message));
    }

    public static ResponseEntity<Error> Response400BadRequest(String message) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Error(message));
    }
    public static ResponseEntity<Error> Response500InternalServerError(Throwable cause, String message) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Error(message, cause));
    }

}
