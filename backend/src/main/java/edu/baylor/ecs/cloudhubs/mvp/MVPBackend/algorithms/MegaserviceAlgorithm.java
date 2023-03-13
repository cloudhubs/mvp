package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.algorithms;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.graph.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.graph.Node;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

public class MegaserviceAlgorithm extends Algorithm {

    private Map<Node, LinkedList<Node>> adjacencyMap;

    /*
        Here we will store ALL NODES with their respective megaservice value,
        and we will let the frontend decide what the threshold is
    */
    private Map<String, Integer> megaserviceList;

    public MegaserviceAlgorithm(Graph graph) {
        super(graph);

        adjacencyMap = graph.getAdjacencyMap();

        megaserviceList = new HashMap<>();

        // Create megaserviceList
        for (Map.Entry<Node, LinkedList<Node>> e : adjacencyMap.entrySet()) {
            megaserviceList.put(e.getKey().getNodeName(), e.getValue().size());
        }
    }




    public Map<Node, LinkedList<Node>> getAdjacencyMap() {
        return adjacencyMap;
    }

    public void setAdjacencyMap(Map<Node, LinkedList<Node>> adjacencyMap) {
        this.adjacencyMap = adjacencyMap;
    }

}
