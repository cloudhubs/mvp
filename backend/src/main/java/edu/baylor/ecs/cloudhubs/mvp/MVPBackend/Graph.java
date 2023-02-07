package edu.baylor.ecs.cloudhubs.mvp.MVPBackend;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.util.*;
import java.util.stream.Collectors;

public class Graph {
    private Map<String, Set<String>> depend = new HashMap<>();
    private Map<String, Set<String>> target = new HashMap<>();

    private Map<Node, LinkedList<Node>> adjacencyMap = new HashMap<>();

    private Map<Integer, Node> indexMap = new HashMap<>();



    /*
        Graph constructor
        Assumptions: Throws exception on invalid graph
        given that it is loaded from a static file
     */
    public Graph() throws Exception {
        Object obj = new JSONParser().parse(new
                FileReader(""));
        JSONObject data = (JSONObject) obj;

        JSONArray jsonNodes = ((JSONArray) data.get("nodes"));

        // Iterate through all the JSON nodes
        int count = 0;
        for (Object node : jsonNodes) {
            JSONObject n = (JSONObject) node;
            Node newNode = jsonToNode(n, count);
            JSONArray deps = ((JSONArray) n.get("dependencies"));
            JSONArray tars = ((JSONArray) n.get("targets"));
            indexMap.put(count, newNode);
            System.out.println(newNode);

            if(deps != null) {
                depend.put((String) n.get("nodeName"), arr2Set(deps));
            }
            if(tars != null) {
                target.put((String) n.get("nodeName"), arr2Set(tars));
            }

            count++;
        }

        // Form the graph from all the collected and converted nodes
        nodesToGraph();
    }

    public Set<String> arr2Set(JSONArray arr){
        Set<String> ret = new HashSet<>();
        for (Object o : arr) {
            JSONObject jo = (JSONObject) o;
            ret.add((String)jo.get("nodeName"));
        }
        return ret;
    }

    public Node jsonToNode(JSONObject obj, Integer index){
        Set<String> dependenciesSet = new HashSet<>();
        Set<String> targetsSet = new HashSet<>();
        JSONArray dependencies = (JSONArray) obj.get("dependencies");
        JSONArray targets = (JSONArray) obj.get("targets");

        if(dependencies != null) {
            dependencies.forEach(o -> {
                JSONObject jo = (JSONObject) o;
                dependenciesSet.add((String) jo.get("nodeName"));
            });
        }

        if(targets != null) {
            targets.forEach(o -> {
                JSONObject jo = (JSONObject) o;
                targetsSet.add((String) jo.get("nodeName"));
            });
        }

        return new Node((String) obj.get("nodeName"), (String) obj.get("nodeType"), index,
                dependenciesSet, targetsSet);
    }

    public void nodesToGraph(){
        for (Node n : indexMap.values()) {
            if(!adjacencyMap.containsKey(n)){
                adjacencyMap.put(n, new LinkedList<>());
            }
            for (String s : n.getTargets()) {
                //Here the nodeList should only have 1 member
                List<Node> nodeList = indexMap.values().stream().filter(me -> me.getNodeName() == s).collect(Collectors.toList());
                adjacencyMap.get(n).add(nodeList.get(0));
            }
        }
    }

    public Map<Node, LinkedList<Node>> getAdjacencyMap() {
        return adjacencyMap;
    }

    public void setAdjacencyMap(Map<Node, LinkedList<Node>> adjacencyMap) {
        this.adjacencyMap = adjacencyMap;
    }

    public Map<Integer, Node> getIndexMap() {
        return indexMap;
    }

    public void setIndexMap(Map<Integer, Node> indexMap) {
        this.indexMap = indexMap;
    }
}
