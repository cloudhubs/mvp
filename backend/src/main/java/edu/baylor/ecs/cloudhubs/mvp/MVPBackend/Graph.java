package edu.baylor.ecs.cloudhubs.mvp.MVPBackend;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.util.*;

public class Graph {
    Map<String, Set<String>> depend = new HashMap<>();
    Map<String, Set<String>> target = new HashMap<>();
    public Graph() throws Exception {
        Object obj = new JSONParser().parse(new
                FileReader("src/main/java/edu/baylor/ecs/cloudhubs/mvp" +
                "/MVPBackend/example-redhat.json"));
        JSONObject data = (JSONObject) obj;

        JSONArray nodes = ((JSONArray)data.get("nodes"));

        for (Object node : nodes) {
            JSONObject n = (JSONObject) node;
            JSONArray deps = ((JSONArray)n.get("dependencies"));
            JSONArray tars = ((JSONArray)n.get("targets"));
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
}
