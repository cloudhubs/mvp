package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.controllers;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.GraphAlgorithms;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@CrossOrigin(origins={"http://localhost:3000"}, maxAge = 3600)
@RequestMapping(value = "anti-pattern")
public class AntiPatternController {
    private class SampleResponse {
        String data;

        public SampleResponse() {

        }

        public String getData() {
            return data;
        }

        public void setData(String data) {
            this.data = data;
        }
    }

    private class SampleRequest {
        String data;

        public SampleRequest() {

        }

        public String getData() {
            return data;
        }

        public void setData(String data) {
            this.data = data;
        }
    }

    @GetMapping("/cyclic")
    public String getCyclic() throws Exception{
        Graph g = new Graph();
        GraphAlgorithms ga = new GraphAlgorithms(g, false);
        return ga.getSCCs();
    }

    // Mapping and format for sending a cyclic json object and returning the
    // cycles
    @PostMapping("/cyclic")
    public ResponseEntity<SampleResponse> getCyclic(@RequestBody SampleRequest request){
        return ResponseEntity.ok(new SampleResponse());


    }

    @PostMapping("/bottleneck")
    public ResponseEntity<SampleResponse> getBottlenecks(@RequestBody SampleRequest request){
        return ResponseEntity.ok(new SampleResponse());


    }
}
