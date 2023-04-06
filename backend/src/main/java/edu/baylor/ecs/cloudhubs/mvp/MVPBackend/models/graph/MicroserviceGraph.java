package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.graph;

import com.google.common.graph.*;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.graph.GraphUtils;

import java.util.Set;

/**
 * Adapter for the Guava graph
 */
@SuppressWarnings("UnstableApiUsage")
public class MicroserviceGraph<T extends Node, E extends Link> {
    MutableNetwork<T, E> graph = NetworkBuilder.directed().build();

    public MicroserviceGraph(Set<T> nodes, Set<E> links) {
        nodes.forEach(graph::addNode);
        links.forEach(link -> graph.addEdge(lookup(link.getSource()), lookup(link.getTarget()), link));
    }

    public Graph<Set<T>> findSCCs() {
        return GraphUtils.findStronglyConnectedComponents(this.graph.asGraph());
    }

    public Set<T> getNodes() {
        return graph.nodes();
    }

    public Set<E> getLinks() {
        return graph.edges();
    }

    /**
     * Finds node by name in the graph
     * @param nodeName name of node
     * @return the node (null if not found)
     */
    public T lookup(String nodeName) {
        return graph.nodes().stream()
                .filter((node -> nodeName.equals(node.getNodeName())))
                .findFirst().orElse(null);
    }
}
