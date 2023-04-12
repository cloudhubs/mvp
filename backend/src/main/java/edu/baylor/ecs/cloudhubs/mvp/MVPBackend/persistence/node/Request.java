package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Simple request implementation modelling a REST
 * request as type (ex: GET), argument(s),
 * msReturn (full name of return type class), and endpointFunction
 * (absolute function name)
 */
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Request {
    private String type;
    private String argument;
    private String msReturn;
    private String endpointFunction;
}
