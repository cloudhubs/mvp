package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.controllers;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.BottleneckAlgorithm;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.GraphAlgorithms;
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


    @GetMapping("/cyclic")
    public Object getCyclic() throws Exception{
        // Understood that the input format will change but for now will read from a specified file

        FileReader fileReader = new FileReader("enterFilePathHere");
        Graph g = new Graph(fileReader);
        GraphAlgorithms ga = new GraphAlgorithms(g, false);
        return ga.getSCCs();
    }


    // TODO Return a bottleneck map
    @GetMapping("/bottleneck/{threshold}")
    public Object getBottlenecks(@PathVariable Integer threshold) throws Exception {
        if(threshold <= 0){
            return "Threshold cannot be non-positive!";
        }

        FileReader fileReader = new FileReader("enterFilePathHere");
        Graph g = new Graph(fileReader);
        BottleneckAlgorithm bottleneckAlgorithm = new BottleneckAlgorithm(g);
        JSONObject returnVal = new JSONObject();
        JSONArray bottleneckList = new JSONArray();
        JSONObject temp;
        for(Map.Entry<String, Integer> e : bottleneckAlgorithm.calculateBottlenecks(threshold).entrySet()){
            temp = new JSONObject();
            temp.put(e.getKey(),e.getValue());
            bottleneckList.add(temp);
        }
        returnVal.put("BottleneckList" ,bottleneckList);
        return returnVal;
    }

    @GetMapping(value = "/data", produces = "application/json")
    public Object getData() throws Exception {

        // Parse the json with JSONParser and store in a general object
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(new FileReader("enterFilePathHere"));

        // Convert the general object to JSONObject
        JSONObject jsonObject = (JSONObject) obj;

        return jsonObject;
    }

    // Post endpoint accepting a .json file to send back as graph
    // TODO Validate the JSON format is acceptable before returning the object
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
