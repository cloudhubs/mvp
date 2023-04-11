package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.models;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.models.patterns.AntiPattern;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.Set;


/**
 * Simple node representation containing only name and type
 */
@Getter
@ToString
@EqualsAndHashCode
public class Node {
    /** Name of node */
    protected final String nodeName;
    /** Type of node */
    protected final String nodeType;
    /** Anti-patterns in the node */
    protected Set<AntiPattern> patterns;

    public Node(String nodeName, String nodeType) {
        this.nodeName = nodeName;
        this.nodeType = nodeType;
    }

    /**
     * Return if names are the same
     * @param nodeName other node name
     * @return if same
     */
    @Deprecated
    public boolean filterByName(String nodeName) {
        return this.nodeName.equals(nodeName);
    }

    public void addPattern(AntiPattern pattern) {
        patterns.add(pattern);
    }

}
