package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.patterns.request;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.graph.MicroserviceGraph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Builder
public class GraphModel {
    @NotNull
    Set<Node> nodes;
    @NotNull
    Set<Link> links;

    public MicroserviceGraph<Node, Link> toGraph() {
        return new MicroserviceGraph<>(nodes, links);
    }

    public static GraphModel fromGraph(MicroserviceGraph<Node, Link> graph) {
        return GraphModel.builder().nodes(graph.getNodes()).links(graph.getLinks()).build();
    }
}
