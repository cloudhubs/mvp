package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns.AntiPattern;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
/**
 * Simple node representation containing only name and type
 */
@Getter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@Setter
@NoArgsConstructor
public class Node {
    /** Name of node */
    protected String nodeName;
    /** Type of node */
    protected String nodeType;
    /** Anti-patterns in the node */
    protected Set<AntiPattern> patterns = new HashSet<>();

    @JsonUnwrapped
    protected NodeMetaData nodeMetaData;
    @JsonUnwrapped
    protected VisualizationData visualizationData;

    public Node(String nodeName, String nodeType) {
        this.nodeName = nodeName;
        this.nodeType = nodeType;
    }

    /**
     * Return if names are the same
     * @param nodeName other node name
     * @return if same
     */
    public boolean filterByName(String nodeName) {
        return this.nodeName.equals(nodeName);
    }

    public void addPattern(AntiPattern pattern) {
        patterns.add(pattern);
    }

    public void clearPatterns() {
        patterns.clear();
    }
}
