package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class Request {
    @NotNull
    private final String type;
    private final String argument;
    private final String msReturn;
    private final String endpointFunction;
}
