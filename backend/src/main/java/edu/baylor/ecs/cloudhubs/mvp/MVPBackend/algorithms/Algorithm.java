package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.algorithms;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.graph.Graph;

public class Algorithm {
    Graph graph;

    Algorithm(){}

    Algorithm(Graph graph){
        this.graph = graph;
    }

    public Graph getGraph() {
        return graph;
    }

    public void setGraph(Graph graph) {
        this.graph = graph;
    }
}
