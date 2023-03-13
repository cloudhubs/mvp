package edu.baylor.ecs.cloudhubs.mvp.MVPBackend;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

public class BottleneckAlgorithm {

    private Map<Node, LinkedList<Node>> adjacencyMap = new HashMap<>();
    private Map<Node, LinkedList<Node>> transposeMap = new HashMap<>();
    Graph graph;

    public BottleneckAlgorithm(Graph graph) {
        this.graph = graph;
        adjacencyMap = graph.getAdjacencyMap();

        // Create transposeMap using similar transpose algorithm
        for(Node key : adjacencyMap.keySet()){
            for(Node val : adjacencyMap.get(key)){
                if(transposeMap.get(val) == null){
                    transposeMap.put(val, new LinkedList<>());
                } else {
                    transposeMap.get(val).push(key);
                }
            }
        }
    }

    public Map<String, Integer> calculateBottlenecks(Integer threshold){
        Map<String, Integer> returnMap = new HashMap<>();

        for(Node n : transposeMap.keySet()){
            if(transposeMap.get(n).size() > threshold){
                returnMap.put(n.getNodeName(), transposeMap.get(n).size());
            }
        }

        return returnMap;
    }

}
