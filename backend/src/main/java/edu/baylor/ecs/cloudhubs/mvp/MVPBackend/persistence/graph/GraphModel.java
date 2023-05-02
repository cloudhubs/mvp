package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.serialization.LinkConverter;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.serialization.NodeConverter;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Node;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns.AntiPattern;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;
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
    /** ID of a graph across its entire lifespan, must be submitted with graph on each save */
    @NotNull
    protected String graphName;
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

    protected String gitCommitId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date")
    private Date createDate;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modify_date")
    private Date modifyDate;

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
     * @param graphName lifelong graph identifier
     * @param graph graph representation from Guava
     * @return graph model
     */
    public static GraphModel fromGraph(Long instanceId, String graphName, MicroserviceGraph graph) {
        return GraphModel.builder()
                .instanceId(instanceId)
                .graphName(graphName)
                .nodes(graph.getNodes())
                .links(graph.getLinks())
                .build();
    }
}
