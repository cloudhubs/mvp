package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.graph;

import com.google.common.graph.*;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import java.util.Set;

/**
 * Adapts the Guava Network representation for simplified interface
 * @apiNote Reminder: Jackson automatically makes JSON representation based on public getters
 */
@SuppressWarnings("UnstableApiUsage")
public class MicroserviceGraph<N extends Node, E extends Link> {
    /** The graph we actually store this as */
    MutableNetwork<N,E> graph = NetworkBuilder.directed().build();

    /**
     * Creates a graph of microservices
     * @param nodes nodes in graph
     * @param links directed links between the nodes
     */
    public MicroserviceGraph(Set<N> nodes, Set<E> links) {
        nodes.forEach(graph::addNode);
        links.forEach(link -> graph.addEdge(lookup(link.getSource()), lookup(link.getTarget()), link));
    }

    /**
     * Finds strongly connected components in the graph
     * @return Graph of Sets of nodes, where each set is a strongly connected component
     */
    public Graph<Set<N>> findSCCs() {
        return GraphUtils.findStronglyConnectedComponents(this.graph.asGraph());
    }

    public Set<N> getNodes() {
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
    public N lookup(String nodeName) {
        return graph.nodes().stream()
                .filter((node -> nodeName.equals(node.getNodeName())))
                .findFirst().orElse(null);
    }
}
