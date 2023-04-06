package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.patterns;

import com.google.common.graph.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.graph.MicroserviceGraph;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Set;

@Log4j2
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@SuppressWarnings("UnstableApiUsage")
public class AntiPatternService {
    public <N extends Node, E extends Link> MicroserviceGraph<N, E> labelCyclicDependencies(MicroserviceGraph<N, E> graph) {
        Objects.requireNonNull(graph);
        Graph<Set<N>> sccs = graph.findSCCs();
        sccs.nodes().forEach(System.out::println);
        return graph;
    }
}
