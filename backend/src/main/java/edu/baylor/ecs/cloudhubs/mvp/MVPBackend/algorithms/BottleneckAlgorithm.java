package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.algorithms;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.graph.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.graph.Node;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

public class BottleneckAlgorithm extends Algorithm {

    private Map<Node, LinkedList<Node>> adjacencyMap;
    private Map<Node, LinkedList<Node>> transposeMap;

    /*
        Here we will store ALL NODES with their respective bottleneck value,
        and we will let the frontend decide what the threshold is
    */
    private Map<String, Integer> bottleneckList;

    public BottleneckAlgorithm(Graph graph) {
        super(graph);

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

        this.bottleneckList = calculateBottlenecks();
    }

    public Map<String, Integer> calculateBottlenecks(){
        Map<String, Integer> returnMap = new HashMap<>();

        for(Node n : transposeMap.keySet()){
            returnMap.put(n.getNodeName(), transposeMap.get(n).size());
        }

        return returnMap;
    }

    public Map<Node, LinkedList<Node>> getAdjacencyMap() {
        return adjacencyMap;
    }

    public void setAdjacencyMap(Map<Node, LinkedList<Node>> adjacencyMap) {
        this.adjacencyMap = adjacencyMap;
    }

    public Map<Node, LinkedList<Node>> getTransposeMap() {
        return transposeMap;
    }

    public void setTransposeMap(Map<Node, LinkedList<Node>> transposeMap) {
        this.transposeMap = transposeMap;
    }

    public Map<String, Integer> getBottleneckList() {
        return bottleneckList;
    }

    public void setBottleneckList(Map<String, Integer> bottleneckList) {
        this.bottleneckList = bottleneckList;
    }
}
