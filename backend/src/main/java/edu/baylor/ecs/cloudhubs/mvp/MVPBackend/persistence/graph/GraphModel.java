package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.serialization.LinkConverter;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.serialization.NodeConverter;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.MicroserviceGraph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Node;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

/**
 * Model of a graph for requests from frontend
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Builder
@Table(name = "graphs")
public class GraphModel {
    @Id
    @GeneratedValue
    protected Long instanceId;
    @NotNull
    protected Long lifelongId;
    @Convert(converter = NodeConverter.class)
    @NotNull
    @Column(columnDefinition="LONGTEXT")
    Set<Node> nodes;
    @Convert(converter = LinkConverter.class)
    @NotNull
    @Column(columnDefinition="LONGTEXT")
    Set<Link> links;

    /**
     * Converts the simple graph model to a Microservice graph to work with
     * @return the microservice graph
     */
    public MicroserviceGraph toGraph() {
        return new MicroserviceGraph(nodes, links);
    }

    public static GraphModel fromGraph(Long instanceId, Long lifelongId, MicroserviceGraph graph) {
        return GraphModel.builder()
                .instanceId(instanceId)
                .lifelongId(lifelongId)
                .nodes(graph.getNodes())
                .links(graph.getLinks())
                .build();
    }
}
