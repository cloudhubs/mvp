package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.antipatterns;

import com.google.common.graph.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Node;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.MicroserviceGraph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns.Bottleneck;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns.CyclicDependency;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@SuppressWarnings("UnstableApiUsage")
public class AntiPatternService {
    /**
     * Takes a graph of Nodes and links and maps the nodes by labelling them if they are in a cyclic dependency
     * @param graph microservice graph
     * @return same graph but labelled with nodes that are in the dependency
     */
    public MicroserviceGraph labelCyclicDependencies(MicroserviceGraph graph) {
        Objects.requireNonNull(graph);

        // Find the strongly connected components
        Graph<Set<Node>> sccs = graph.findSCCs();
        // Reduce SCCs to only those containing multiple nodes
        Set<Set<Node>> cyclicDeps = sccs.nodes().stream().filter(scc -> scc.size() > 1).collect(Collectors.toSet());

        // Iterate over the strongly connected components and add cyclic dependency
        // tags to applicable nodes
        for (Set<Node> scc : cyclicDeps) {
            scc.forEach(node -> graph.getNodes().stream().filter(node2 ->
                    node2.filterByName(node.getNodeName())).findFirst().ifPresent(
                            n -> n.addPattern(new CyclicDependency(scc))
                    )
            );
        }

        // Return the new graph
        return graph;
    }

    /**
     * Takes a graph of Nodes and links and maps the nodes by labelling them if they are in a bottleneck dependency
     * @param graph microservice graph
     * @return same graph but labelled with nodes that are in the dependency
     */
    public MicroserviceGraph labelBottlenecks(MicroserviceGraph graph, Integer threshold) {
        Objects.requireNonNull(graph);
        Objects.requireNonNull(threshold);

        if(threshold < 0){
            throw new IllegalArgumentException("Threshold cannot be non-positive");
        }


        // Count of how many nodes depend on each node
        Map<String, Integer> nodeCount = new HashMap<>();

        // Fill the map
        for(Link l : graph.getLinks()) {
            nodeCount.merge(l.getTarget(), 1, Integer::sum);
        }

        // Apply the pattern
        nodeCount.forEach((K,V) -> {
            if(V > threshold) {
                graph.getNodes()
                .stream()
                .filter(node -> node.filterByName(K)).findFirst().ifPresent(
                    n -> n.addPattern(new Bottleneck(threshold))
                );
            }
        });

        // Return the new graph
        return graph;
    }
}
