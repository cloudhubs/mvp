package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns;

import com.google.common.graph.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.graph.MicroserviceGraph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model.CyclicNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public MicroserviceGraph<CyclicNode, Link> labelCyclicDependencies(MicroserviceGraph<Node, Link> graph) {
        Objects.requireNonNull(graph);
        Graph<Set<Node>> sccs = graph.findSCCs();
        Set<Node> nodesInCyclic = sccs.nodes().stream().filter(scc -> scc.size() > 1)
                .flatMap(Set::stream).collect(Collectors.toSet());
        Set<CyclicNode> labeledNodes = graph.getNodes().stream()
                .map(CyclicNode::new).collect(Collectors.toSet());

        if (!nodesInCyclic.isEmpty()) {
            labeledNodes.forEach(node ->
                    node.setInCyclicDependency(
                            nodesInCyclic.stream().anyMatch(node2 -> node.getNodeName().equals(node2.getNodeName())))
            );
        }

        return new MicroserviceGraph<>(labeledNodes, graph.getLinks());
    }
}
