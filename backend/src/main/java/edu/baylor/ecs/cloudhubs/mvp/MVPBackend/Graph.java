package edu.baylor.ecs.cloudhubs.mvp.MVPBackend;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.util.*;

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
        Set<Node> dependenciesSet = new HashSet<>();
        Set<Node> targetsSet = new HashSet<>();
        JSONArray dependencies = (JSONArray) obj.get("dependencies");
        JSONArray targets = (JSONArray) obj.get("targets");

        for (Object o: dependencies) {

        }

        return new Node((String) obj.get("nodeName"), (String) obj.get("nodeType"),
                (Set<Node>) obj.get("dependencies"), (Set<Node>) obj.get("target"));
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
