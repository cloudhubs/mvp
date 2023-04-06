package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

/**
 * Node with cyclic dependency labelling
 * @apiNote probably could be improved by taking after decorator pattern more -Austin
 */
@Getter
public class CyclicNode extends Node {
    @Setter
    protected boolean isInCyclicDependency;

    /**
     * Creates a cyclic node from an existing node
     * @param node node to wrap
     */
    public CyclicNode(Node node) {
        super(node.getNodeName(), node.getNodeType());
        isInCyclicDependency = false;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        CyclicNode that = (CyclicNode) o;
        return isInCyclicDependency == that.isInCyclicDependency;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), isInCyclicDependency);
    }

    @Override
    public String toString() {
        return "CyclicNode{" +
                "isInCyclicDependency=" + isInCyclicDependency +
                ", nodeName='" + nodeName + '\'' +
                ", nodeType='" + nodeType + '\'' +
                '}';
    }
}
