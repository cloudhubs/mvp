package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Simple request implementation modelling a REST
 * request as type (ex: GET), argument(s),
 * msReturn (full name of return type class), and endpointFunction
 * (absolute function name)
 */
@AllArgsConstructor
@Getter
public class Request {
    @NotNull
    private final String type;
    private final String argument;
    private final String msReturn;
    private final String endpointFunction;
}
