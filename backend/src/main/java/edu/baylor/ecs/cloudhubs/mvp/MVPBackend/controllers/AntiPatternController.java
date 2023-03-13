package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.controllers;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.algorithms.BottleneckAlgorithm;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.graph.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.algorithms.SCCAlgorithm;
import lombok.extern.log4j.Log4j2;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Map;

// TODO Flesh out error handling and validation/verification
// TODO Optimize endpoints (remove duplicate code)
@Log4j2
@RestController
@CrossOrigin(origins={"http://localhost:3000"}, maxAge = 3600)
public class AntiPatternController {


    // Return a list of all the cyclic dependencies
    @GetMapping("/cyclic")
    public Object getCyclic() throws Exception {

        FileReader fileReader = new FileReader("enterFilePathHere");
        Graph g = new Graph(fileReader);
        SCCAlgorithm sccAlgorithm = new SCCAlgorithm(g, false);


        JSONObject returnVal = new JSONObject();
        JSONArray SCCList = new JSONArray();
        sccAlgorithm.getSCCList().forEach(s -> SCCList.add(s));
        returnVal.put("SCCList", SCCList);

        return returnVal;
    }


    /*
        Here we will return ALL NODES with their respective bottleneck value,
        and we will let the frontend decide what the threshold is
    */
    @GetMapping("/bottleneck")
    public Object getBottlenecks() throws Exception {
        FileReader fileReader = new FileReader("enterFilePathHere");
        Graph g = new Graph(fileReader);
        BottleneckAlgorithm bottleneckAlgorithm = new BottleneckAlgorithm(g);

        JSONObject returnVal = new JSONObject();
        JSONArray bottleneckList = new JSONArray();
        JSONObject temp;

        for(Map.Entry<String, Integer> e : bottleneckAlgorithm.getBottleneckList().entrySet()){
            temp = new JSONObject();
            temp.put(e.getKey(),e.getValue());
            bottleneckList.add(temp);
        }

        returnVal.put("BottleneckList" ,bottleneckList);

        return returnVal;
    }

    // Just return data file stored locally as JSON
    @GetMapping(value = "/data", produces = "application/json")
    public Object getData() throws Exception {

        // Parse the json with JSONParser and store in a general object
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(new FileReader("enterFilePathHere"));

        // Convert the general object to JSONObject
        JSONObject jsonObject = (JSONObject) obj;

        return jsonObject;
    }

    // Post endpoint accepting a .json file to send back as JSON file
    // TODO Validate the JSON format is acceptable before returning the object
    // This is mostly intended to be a placeholder if we want to operate on
    // files uploaded live from users
    @PostMapping(value = "/graph", consumes = "multipart/form-data", produces = "application/json")
    public Object getDataFromFile(@RequestParam("file") MultipartFile multipartFile) throws Exception {

        // Validating file
        if(multipartFile.isEmpty()){
            return "Cannot accept an empty file!";
        } else if(!multipartFile.getContentType().equals("application/json")){
            return "Cannot accept non json formats!";
        }

        // Transitioning data to a temporary file
        File file = new File("enterTempFilePathHereNameDoesntMatterButPutInResources");
        file.createNewFile();
        try (OutputStream os = new FileOutputStream(file)) {
            os.write(multipartFile.getBytes());
        }

        // Parsing data similarly to above
        JSONParser parser = new JSONParser();
        FileReader fileReader = new FileReader(file);

        Object obj = parser.parse(fileReader);
        JSONObject jsonObject = (JSONObject) obj;

        // Cleanup the file
        file.deleteOnExit();

        return jsonObject;
    }
}
