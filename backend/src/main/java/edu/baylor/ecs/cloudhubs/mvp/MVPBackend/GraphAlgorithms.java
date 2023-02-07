package edu.baylor.ecs.cloudhubs.mvp.MVPBackend;

import java.util.*;

public class GraphAlgorithms {

    Map<Node, LinkedList<Node>> adjacencyMap;

    Map<Integer, Node> indexMapping;


    // Function returns the transposed adjacencyList aka reversed adjacencyList
    Map<Node, LinkedList<Node>> getTranspose(Map<Node, LinkedList<Node>> adjacencyMap) {
        Map<Node, LinkedList<Node>> g = new HashMap<>();

        for (Map.Entry<Node, LinkedList<Node>> entry : adjacencyMap.entrySet()) {
            for(Node n : entry.getValue()) {
                if(!g.containsKey(n)){
                    g.put(n, new LinkedList<>());
                }
                g.get(n).add(entry.getKey());
            }
        }

        return g;
    }

    ////////////////

    // Function sets the order of traversal by pushing to the stack
    void fillOrder(Map<Node, LinkedList<Node>> adjacencyMap, Map<Integer, Node> indexMap,
                   int index, boolean visited[], Stack stack) {
        // Mark the current node as visited and print it
        visited[index] = true;

        // Recur for all the nodes adjacent to this node
        for (Node n : adjacencyMap.get(indexMap.get(index)))
        {

            if(!visited[n.getIndex()])
                fillOrder(adjacencyMap, indexMap, n.getIndex(), visited, stack);
        }

        // All nodes reachable from index are processed by now,
        // push index to Stack
        stack.push(Integer.valueOf(index));
    }

    public static void SCC(Graph graphObj){

        Map<Node, LinkedList<Node>> adjacencyMap = graphObj.getAdjacencyMap();

        int vertex = 0;


        // Function that returns reverse (or transpose) of this graph




        /*
        // A recursive function to print DFS starting from v
    void DFSUtil(int v,boolean visited[])
    {
        // Mark the current node as visited and print it
        visited[v] = true;
        System.out.print(v + " ");

        int n;

        // Recur for all the vertices adjacent to this vertex
        Iterator<Integer> i =adj[v].iterator();
        while (i.hasNext())
        {
            n = i.next();
            if (!visited[n])
                DFSUtil(n,visited);
        }
    }

    // Function that returns reverse (or transpose) of this graph
    Graph getTranspose()
    {
        Graph g = new Graph(V);
        for (int v = 0; v < V; v++)
        {
            // Recur for all the vertices adjacent to this vertex
            Iterator<Integer> i =adj[v].listIterator();
            while(i.hasNext())
                g.adj[i.next()].add(v);
        }
        return g;
    }

    void fillOrder(int v, boolean visited[], Stack stack)
    {
        // Mark the current node as visited and print it
        visited[v] = true;

        // Recur for all the vertices adjacent to this vertex
        Iterator<Integer> i = adj[v].iterator();
        while (i.hasNext())
        {
            int n = i.next();
            if(!visited[n])
                fillOrder(n, visited, stack);
        }

        // All vertices reachable from v are processed by now,
        // push v to Stack
        stack.push(new Integer(v));
    }

    // The main function that finds and prints all strongly
    // connected components
    void printSCCs()
    {
        Stack stack = new Stack();

        // Mark all the vertices as not visited (For first DFS)
        boolean visited[] = new boolean[V];
        for(int i = 0; i < V; i++)
            visited[i] = false;

        // Fill vertices in stack according to their finishing
        // times
        for (int i = 0; i < V; i++)
            if (visited[i] == false)
                fillOrder(i, visited, stack);

        // Create a reversed graph
        Graph gr = getTranspose();

        // Mark all the vertices as not visited (For second DFS)
        for (int i = 0; i < V; i++)
            visited[i] = false;

        // Now process all vertices in order defined by Stack
        while (stack.empty() == false)
        {
            // Pop a vertex from stack
            int v = (int)stack.pop();

            // Print Strongly connected component of the popped vertex
            if (visited[v] == false)
            {
                gr.DFSUtil(v, visited);
                System.out.println();
            }
        }
    }
         */






        //////////////////////////////////////////////////////////////////////////



        /*
        if (vertex && !this.list[vertex]) {
            console.log(vertex);
            throw new Error("Vertex DNE");
        }

        vertex = vertex
            ? vertex.toString()
            : Object.keys(this.list)[0].toString();


        // Create Copy of current Adjacency list

        var reverseEdgeGraph = getReverseGraph(this.list);
        var stack = [];
        var visited = {};
        for (var vertex in this.list) {
            this.dfs(
                    null,
                    vertex,
                    function (v) {
                stack.push(v);
            },
            visited
            );
        }

        var allSCC = [];
        visited = {};
        stack.reverse().forEach((vertex) => {
                var SCC = [];
        this.dfs(
                reverseEdgeGraph,
                vertex,
                function (v) {
            SCC.push(v);
        },
        visited
            );
        if (SCC.length) allSCC.push(SCC);
        });

        return allSCC;
    }
         */
    }
}
