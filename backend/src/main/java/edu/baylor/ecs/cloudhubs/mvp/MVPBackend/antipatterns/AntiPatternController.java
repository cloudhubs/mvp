package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model.PatternedNode;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Link;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.Node;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.models.graph.MicroserviceGraph;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.antipatterns.model.GraphModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/anti-pattern")
@CrossOrigin(origins={"http://localhost:3000"}, maxAge = 3600)
public class AntiPatternController {
    final AntiPatternService antiPatternService;

    /**
     * Labels the provided graph with cyclic dependencies
     * @return the labelled graph
     */
    @GetMapping("/cyclic")
    public ResponseEntity<MicroserviceGraph<PatternedNode, Link>> getCyclicDependencies(@RequestBody GraphModel<Node, Link> graphModel) {
        MicroserviceGraph<PatternedNode, Link> resultGraph = antiPatternService.labelCyclicDependencies(graphModel.toGraph());
        return ResponseEntity.ok(resultGraph);
    }

    /**
     * Labels the provided graph with bottlenecks
     * @return the labelled graph
     */
    @GetMapping("/bottleneck")
    public ResponseEntity<GraphModel<Node, Link>> getBottleneck() {
        return null;
    }
}
