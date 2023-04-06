package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

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

    public Node(String nodeName, String nodeType) {
        this.nodeName = nodeName;
        this.nodeType = nodeType;
    }
}
