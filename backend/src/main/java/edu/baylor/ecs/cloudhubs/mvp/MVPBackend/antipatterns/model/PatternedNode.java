package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model.patterns.AntiPattern;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

public class PatternedNode extends Node {
    @Getter
    protected Set<AntiPattern> patterns;

    public PatternedNode(Node node) {
        super(node.getNodeName(), node.getNodeType());
        patterns = new HashSet<>();
    }

    public void addPattern(AntiPattern pattern) {
        patterns.add(pattern);
    }
}
