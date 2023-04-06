package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.patterns.model;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
public class CyclicNode extends Node {
    @Setter
    protected boolean isInCyclicDependency;

    public CyclicNode(String nodeName, String nodeType) {
        super(nodeName, nodeType);
        isInCyclicDependency = false;
    }

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
