package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model.patterns;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import lombok.Getter;

import java.util.Set;
import java.util.stream.Collectors;

public class CyclicDependency implements AntiPattern {
    private static final String NAME = "Cyclic Dependency";
    @Getter
    private final Set<String> problemNodes;

    /**
     * Creates a cyclic dependency record between the nodes in the scc
     * @param scc nodes in the cyclic dependency
     */
    public CyclicDependency(Set<Node> scc) {
        this.problemNodes = scc.stream().map(Node::getNodeName).collect(Collectors.toSet());
    }

    /**
     * Gets the name
     * @return name
     */
    @Override
    public String getName() {
        return NAME;
    }
}
