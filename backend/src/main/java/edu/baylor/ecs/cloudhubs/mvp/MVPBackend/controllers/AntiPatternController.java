package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.controllers;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.Graph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.GraphAlgorithms;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@CrossOrigin(origins={"http://localhost:3000"},
        maxAge = 3600)
@RequestMapping(value = "language")
public class AntiPatternController {
    @GetMapping("/cyclic")
    public String getCyclic() throws Exception{
        Graph g = new Graph();
        GraphAlgorithms ga = new GraphAlgorithms(g, false);
        return ga.getSCCs();
    }
}
