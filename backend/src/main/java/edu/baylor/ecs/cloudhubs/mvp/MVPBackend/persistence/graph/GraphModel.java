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
 * Model of a graph for JSON serialization and storage in database
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
    /** ID of a specific snapshot of the graph */
    @Id
    @GeneratedValue
    protected Long instanceId;
    /** ID of a graph across its entire lifespan */
    @NotNull
    protected Long lifelongId;
    /** Nodes in the graph */
    @Convert(converter = NodeConverter.class)
    @NotNull
    @Column(columnDefinition="LONGTEXT")
    Set<Node> nodes;
    /** Links in the graph */
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

    /**
     * Builder for the graph
     * @param instanceId instance ID
     * @param lifelongId lifelong graph ID
     * @param graph graph representation from Guava
     * @return graph model
     */
    public static GraphModel fromGraph(Long instanceId, Long lifelongId, MicroserviceGraph graph) {
        return GraphModel.builder()
                .instanceId(instanceId)
                .lifelongId(lifelongId)
                .nodes(graph.getNodes())
                .links(graph.getLinks())
                .build();
    }
}
