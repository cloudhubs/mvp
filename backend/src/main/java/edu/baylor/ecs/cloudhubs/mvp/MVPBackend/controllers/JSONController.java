package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Log4j2
@RestController
@CrossOrigin(origins={"http://localhost:3000"}, maxAge = 3600)
@RequestMapping(value = "language")
public class JSONController {
    @GetMapping("/JSON")
    public String getLanguage() throws IOException {
        return new String(Files.readAllBytes(Paths.get("src/main/java/edu/baylor/ecs/cloudhubs/" +
                "mvp/MVPBackend/example-redhat.json")));
    }

    @PostMapping("/save")
    public void saveGraph(int id, String data){
        System.out.println("Got graph with id " + id);
    }

}
