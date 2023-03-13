package edu.baylor.ecs.cloudhubs.mvp.MVPBackend;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.*;

public class GraphAlgorithms {
    private LinkedList<Integer>[] adj; //Adjacency List.
    private int size;
    Graph g;

    public GraphAlgorithms(Graph g, boolean reverse){
        size = g.getSize();
        this.g = g;
        adj = new LinkedList[size];
        for(int i=0; i < size; i++){
            adj[i] = new LinkedList<>();
        }
        if(!reverse) {
            generateAdjList(g);
        }
    }

    //Need to make this return a string of SCC found.
    private void DFSUtil(int v, boolean[] visited, List<Integer> sccs){
        visited[v] = true;
        sccs.add(v);

        int n;

        for (int i : adj[v]) {
            n = i;
            if (!visited[n]) {
                DFSUtil(n, visited, sccs);
            }
        }
    }

    private GraphAlgorithms getTranspose(Graph g) throws Exception{
        GraphAlgorithms gar = new GraphAlgorithms(g, true);

        for(Node n : g.getIndexMap().values()){
            for(Node t : g.getAdjacencyMap().get(n)){
                gar.adj[t.getIndex()].add(n.getIndex());
            }
        }

        return gar;
    }

    public JSONObject getSCCs() throws Exception {
        Stack stack = new Stack();
        List<List<String>> allSCCs = new ArrayList<>();

        boolean[] visited = new boolean[g.getSize()];
        for(int i = 0; i < size; i++){
            visited[i] = false;
        }

        for(int i = 0; i < size; i++){
            if(!visited[i]){
                fillOrder(i, visited, stack);
            }
        }

        //Reversed graph
        GraphAlgorithms gar = getTranspose(g);

        for(int i = 0; i < size; i++){
            visited[i] = false;
        }

        while(!stack.empty()){
            int v = (int)stack.pop();

            if(!visited[v]){
                List<Integer> sccs = new ArrayList<>();
                gar.DFSUtil(v, visited, sccs);
                if(sccs.size() > 1){
                    //There is an SCC
                    List<String> curr = new ArrayList<>();

                    for(int i : sccs){
                        curr.add(g.getIndexMap().get(i).getNodeName());
                    }

                    allSCCs.add(curr);
                }
            }
        }

        JSONObject returnVal = new JSONObject();
        JSONArray SCCList = new JSONArray();
        allSCCs.forEach(s -> SCCList.add(s));
        returnVal.put("SCCList", SCCList);
        return returnVal;
    }

    private void fillOrder(int i, boolean[] visited, Stack stack) {
        visited[i] = true;

        for(int v : adj[i]){
            int n = v;
            if(!visited[n]){
                fillOrder(n, visited, stack);
            }
        }

        stack.push(i);
    }

    public void generateAdjList(Graph g){
        //size = g.getSize();
        //Go through nodes in loop 1, getting adj[i]
        //Then add the targets to adj[i].add
        for(Node n : g.getIndexMap().values()){
            for(Node t : g.getAdjacencyMap().get(n)){
                adj[n.getIndex()].add(t.getIndex());
            }
        }
    }
}
