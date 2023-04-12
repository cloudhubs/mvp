package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.graph;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.GraphModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/graph")
@CrossOrigin(origins={"http://localhost:3000"}, maxAge = 3600)
public class GraphController {
    protected final GraphService graphService;

    @GetMapping("/instance/{id}")
    public ResponseEntity<GraphModel> getGraphSnapshot(@PathVariable Long id) {
        return ResponseEntity.of(graphService.getGraphInstance(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<GraphModel>> getAllInstances(@PathVariable Long id) {
        return ResponseEntity.ok(graphService.getAllInstancesOfGraph(id));
    }

    @PostMapping("/instance")
    public ResponseEntity<GraphModel> saveGraphInstance(@RequestBody GraphModel graphModel) {
        return ResponseEntity.ok(graphService.saveGraphInstance(graphModel));
    }
}
