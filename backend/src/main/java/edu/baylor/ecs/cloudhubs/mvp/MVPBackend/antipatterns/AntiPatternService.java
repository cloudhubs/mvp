package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns;

import com.google.common.graph.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model.PatternedNode;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model.patterns.CyclicDependency;
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
    public MicroserviceGraph<PatternedNode, Link> labelCyclicDependencies(MicroserviceGraph<Node, Link> graph) {
        Objects.requireNonNull(graph);
        Graph<Set<Node>> sccs = graph.findSCCs();
        Set<Set<Node>> multiNodeSccs = sccs.nodes().stream().filter(scc -> scc.size() > 1).collect(Collectors.toSet());
        Set<PatternedNode> labeledNodes = graph.getNodes().stream()
                .map(PatternedNode::new).collect(Collectors.toSet());

        for (Set<Node> scc : multiNodeSccs) {
            scc.forEach(node -> labeledNodes.stream().filter(node2 ->
                    node2.filterByName(node.getNodeName())).findFirst().ifPresent(
                            n -> n.addPattern(new CyclicDependency(scc))
                    )
            );
        }

        return new MicroserviceGraph<>(labeledNodes, graph.getLinks());
    }
}
