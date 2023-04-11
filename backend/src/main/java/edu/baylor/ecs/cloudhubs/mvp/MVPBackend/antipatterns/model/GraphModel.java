package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.models.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.models.graph.MicroserviceGraph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.models.Node;
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
public class GraphModel {
    @NotNull
    Set<Node> nodes;
    @NotNull
    Set<Link> links;

    /**
     * Converts the simple graph model to a Microservice graph to work with
     * @return the microservice graph
     */
    public MicroserviceGraph toGraph() {
        return new MicroserviceGraph(nodes, links);
    }
}
