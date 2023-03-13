package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.graph;

import java.util.Objects;
import java.util.Set;

public class Node {
    private String nodeName;
    private String nodeType;

    private Integer index;
    private Set<String> dependencies;

    private Set<String> targets;

    public Node(String nodeName, String nodeType, Integer index, Set<String> dependencies, Set<String> targets){
        this.nodeName = nodeName;
        this.nodeType = nodeType;
        this.index = index;
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

    public Integer getIndex() {
        return index;
    }

    public Set<String> getDependencies() {
        return dependencies;
    }

    public void setDependencies(Set<String> dependencies) {
        this.dependencies = dependencies;
    }

    public Set<String> getTargets() {
        return targets;
    }

    public void setTargets(Set<String> targets) {
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
