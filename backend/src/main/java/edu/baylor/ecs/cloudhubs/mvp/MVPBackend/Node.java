package edu.baylor.ecs.cloudhubs.mvp.MVPBackend;

import java.util.Objects;
import java.util.Set;

public class Node {
    private String nodeName;
    private String nodeType;
    private Set<Node> dependencies;

    private Set<Node> targets;

    public Node(String nodeName, String nodeType, Set<Node> dependencies, Set<Node> targets){
        this.nodeName = nodeName;
        this.nodeType = nodeType;
        this.dependencies = dependencies;
        this.targets = targets;
    }

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public String getNodeType() {
        return nodeType;
    }

    public void setNodeType(String nodeType) {
        this.nodeType = nodeType;
    }

    public Set<Node> getDependencies() {
        return dependencies;
    }

    public void setDependencies(Set<Node> dependencies) {
        this.dependencies = dependencies;
    }

    public Set<Node> getTargets() {
        return targets;
    }

    public void setTargets(Set<Node> targets) {
        this.targets = targets;
    }

    @Override
    public String toString() {
        return "Node {" +
                "nodeName = '" + nodeName + '\'' +
                ", nodeType = '" + nodeType + '\'' +
                ", dependencies = " + dependencies +
                ", targets = " + targets +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Node node = (Node) o;
        return Objects.equals(nodeName, node.nodeName) && Objects.equals(nodeType, node.nodeType) && Objects.equals(dependencies, node.dependencies) && Objects.equals(targets, node.targets);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nodeName, nodeType, dependencies, targets);
    }
}
