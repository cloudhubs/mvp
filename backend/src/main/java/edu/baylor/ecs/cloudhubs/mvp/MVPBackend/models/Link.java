package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class Link {
    /** Source node name */
    @NotNull
    private final String source;

    /** Target node name */
    @NotNull
    private final String target;

    /** List of requests */
    private final List<Request> requests;
}
