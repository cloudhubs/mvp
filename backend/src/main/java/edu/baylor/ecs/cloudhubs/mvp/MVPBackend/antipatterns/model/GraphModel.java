package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.graph.MicroserviceGraph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

/**
 * Model of a graph for requests from frontend
 * @param <N> Node representation extending Node
 * @param <E> Link representation
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class GraphModel<N extends Node, E extends Link> {
    @NotNull
    Set<N> nodes;
    @NotNull
    Set<E> links;

    /**
     * Converts the simple graph model to a Microservice graph to work with
     * @return the microservice graph
     */
    public MicroserviceGraph<N, E> toGraph() {
        return new MicroserviceGraph<>(nodes, links);
    }
}
