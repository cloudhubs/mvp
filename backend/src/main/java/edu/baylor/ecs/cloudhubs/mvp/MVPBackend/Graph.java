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

    private Map<Node, Node> nodeGraph = new HashMap<>();

    private List<Node> nodes = new ArrayList<>();



    /*
        Graph constructor
        Assumptions: Throws exception on invalid graph
        given that it is loaded from a static file
     */
    public Graph() throws Exception {
        Object obj = new JSONParser().parse(new
                FileReader("src/main/java/edu/baylor/ecs/cloudhubs/mvp" +
                "/MVPBackend/example-redhat.json"));
        JSONObject data = (JSONObject) obj;

        JSONArray nodes = ((JSONArray)data.get("nodes"));

        // Iterate through all the JSON nodes
        for (Object node : nodes) {
            JSONObject n = (JSONObject) node;
            Node newNode = jsonToNode(n);
            JSONArray deps = ((JSONArray)n.get("dependencies"));
            JSONArray tars = ((JSONArray)n.get("targets"));
            nodes.add(newNode);

            if(deps != null) {
                depend.put((String) n.get("nodeName"), arr2Set(deps));
            }
            if(tars != null) {
                target.put((String) n.get("nodeName"), arr2Set(tars));
            }
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

    public Node jsonToNode(JSONObject obj){
        Set<String> dependenciesSet = new HashSet<>();
        Set<String> targetsSet = new HashSet<>();
        JSONArray dependencies = (JSONArray) obj.get("dependencies");
        JSONArray targets = (JSONArray) obj.get("targets");

        dependencies.forEach(o -> {
            JSONObject jo = (JSONObject) o;
            dependenciesSet.add((String) jo.get("nodeName"));
        });

        targets.forEach(o -> {
            JSONObject jo = (JSONObject) o;
            targetsSet.add((String) jo.get("nodeName"));
        });

        return new Node((String) obj.get("nodeName"), (String) obj.get("nodeType"),
                dependenciesSet, targetsSet);
    }

    public void nodesToGraph(){
        for (Node n : nodes) {
            for (String s : n.getTargets()) {
                //Here the nodeList should only have 1 member
                List<Node> nodeList = nodes.stream().filter(me -> me.getNodeName() == s).collect(Collectors.toList());
                nodeGraph.put(n, nodeList.get(0));
            }
        }
    }

    public Map<String, Set<String>> getDepend() {
        return depend;
    }

    public void setDepend(Map<String, Set<String>> depend) {
        this.depend = depend;
    }

    public Map<String, Set<String>> getTarget() {
        return target;
    }

    public void setTarget(Map<String, Set<String>> target) {
        this.target = target;
    }
}
