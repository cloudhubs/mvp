package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.models;

import java.util.Set;

/**
 * Intermediate Language representation of a Node, use if
 * you want to represent the graph that way instead.
 */
public class IRNode extends Node {
    /** Node names that this node depends on*/
    protected Set<String> dependencies;
    /** Dependents of this node */
    protected Set<String> targets;

    public IRNode(String nodeName, String nodeType) {
        super(nodeName, nodeType);
        this.dependencies = null;
        this.targets = null;
    }

    public IRNode(String nodeName, String nodeType, Set<String> dependencies, Set<String> targets) {
        super(nodeName, nodeType);
        this.dependencies = dependencies;
        this.targets = targets;
    }

    public Set<String> getDependencies() {
        return dependencies;
    }

    public Set<String> getTargets() {
        return targets;
    }
}
