package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.graph;

import com.google.common.graph.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.MicroserviceGraph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Node;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns.Bottleneck;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns.CyclicDependency;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@AllArgsConstructor
@SuppressWarnings("UnstableApiUsage")
public class AntiPatternLabeler {
    @Getter
    @NonNull
    private MicroserviceGraph graph;

    public AntiPatternLabeler labelCyclicDependencies() {
        // Find the strongly connected components
        Graph<Set<Node>> sccs = graph.findSCCs();
        // Reduce SCCs to only those containing multiple nodes
        List<Set<Node>> cyclicDeps = sccs.nodes().stream().filter(scc -> scc.size() > 1).toList();

        // Iterate over the strongly connected components and add cyclic dependency
        // tags to applicable nodes
        for (int i = 0; i < cyclicDeps.size(); i++) {
            Set<Node> scc = cyclicDeps.get(i);
            int id = i;
            scc.forEach(node -> graph.getNodes().stream().filter(node2 ->
                            node2.filterByName(node.getNodeName())).findFirst().ifPresent(
                            n -> n.addPattern(new CyclicDependency(scc, (long) id))
                    )
            );
        }

        return this;
    }

    public AntiPatternLabeler labelBottleneck() {
        // Count of how many nodes depend on each node
        Map<String, Integer> nodeCount = new HashMap<>();

        // Fill the map
        for(Link l : graph.getLinks()) {
            nodeCount.merge(l.getTarget(), 1, Integer::sum);
        }

        // Apply the pattern
        nodeCount.forEach((K,V) -> graph.lookup(K).addPattern(new Bottleneck(V)));
        return this;
    }

    public MicroserviceGraph labelAll() {
        return this.labelCyclicDependencies()
                .labelBottleneck()
                .getGraph();
    }
}
