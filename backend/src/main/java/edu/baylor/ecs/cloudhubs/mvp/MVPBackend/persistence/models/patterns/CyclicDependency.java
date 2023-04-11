package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.models.patterns;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.models.Node;
import lombok.Getter;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Object representation of a cyclic dependency
 */
public class CyclicDependency implements AntiPattern {
    /** Name of this pattern */
    private static final String NAME = "Cyclic Dependency";

    /** Set of names of the nodes comprising the cyclic dependency */
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
