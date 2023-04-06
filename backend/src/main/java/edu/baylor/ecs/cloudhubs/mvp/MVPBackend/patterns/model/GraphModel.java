package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.patterns.model;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.graph.MicroserviceGraph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

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

    public MicroserviceGraph<N, E> toGraph() {
        return new MicroserviceGraph<>(nodes, links);
    }

    public static <N extends Node, E extends Link> GraphModel<N, E> fromGraph(MicroserviceGraph<N, E> graph) {
        GraphModel<N,E> model = new GraphModel<>();
        model.setNodes(graph.getNodes());
        model.setLinks(graph.getLinks());
        return model;
    }
}
