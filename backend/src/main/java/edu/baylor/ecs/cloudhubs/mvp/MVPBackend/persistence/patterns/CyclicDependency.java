package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Node;
import lombok.*;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Object representation of a cyclic dependency
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class CyclicDependency implements AntiPattern {
    /** Set of names of the nodes comprising the cyclic dependency */
    protected Set<String> problemNodes;
    /** ID of this pattern (same for all nodes in a cyclic dependency */
    protected Long id;

    /**
     * Creates a cyclic dependency record between the nodes in the scc
     * @param scc nodes in the cyclic dependency
     */
    public CyclicDependency(Set<Node> scc, Long id) {
        this.id = id;
        this.problemNodes = scc.stream().map(Node::getNodeName).collect(Collectors.toSet());
    }
}
