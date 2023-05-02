package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Generic link representation
 * @apiNote Requests might be optional or better off generified
 */
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Link {
    /** Source node name */
    @NotNull
    private String source;

    /** Target node name */
    @NotNull
    private String target;

    /** List of requests */
    private List<Request> requests;

    public String getName() {
        return source + " --> " + target;
    }
}
