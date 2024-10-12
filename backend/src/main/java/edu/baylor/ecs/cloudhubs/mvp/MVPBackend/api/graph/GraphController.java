package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.graph;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.model.Errors;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.model.ForbiddenException;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.model.NotFoundException;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.GraphModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/graph")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, maxAge = 3600, allowedHeaders = "*")
public class GraphController {
    protected final GraphService graphService;

    @GetMapping("/instance/{id}")
    public ResponseEntity<GraphModel> getGraphInstance(@PathVariable Long id) {
        return ResponseEntity.of(graphService.getGraphInstance(id));
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<GraphModel>> getAllInstances(@PathVariable String name) {
        return ResponseEntity.ok(graphService.getAllInstancesOfGraph(name));
    }

    /**
     * Test endpoint to return a JSON file from the classpath.
     * If no data presents on the database, this endpoint will be used to test the frontend
     *
     * @return JSON file as a ResponseEntity
     * @throws IOException if the file cannot be read
     */
    @GetMapping("/test")
    public ResponseEntity<JsonNode> testEndpoint() throws IOException {
        // Load the JSON file from the classpath
        ClassPathResource resource = new ClassPathResource("test-response.json");

        // Read the JSON file into a JsonNode using ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        InputStream inputStream = resource.getInputStream();
        JsonNode jsonResponse = objectMapper.readTree(inputStream);

        // Return the JSON as a ResponseEntity
        return ResponseEntity.ok(jsonResponse);
    }

    @PostMapping("/instance")
    public ResponseEntity<?> newGraphInstance(@RequestBody GraphModel graphModel) {
        GraphModel saved;
        try {
            saved = graphService.newGraphInstance(graphModel);
        } catch (NotFoundException e) {
            System.out.println(graphModel.getGraphName());
            return Errors.Response404NotFound(e.getMessage());
        } catch (Exception e) {
            return Errors.Response500InternalServerError(e, e.getMessage());
        }
        return ResponseEntity.ok(saved);
    }

    @PatchMapping("/instance")
    public ResponseEntity<?> updateGraphInstance(@RequestBody GraphModel graphModel) {
        GraphModel savedModel;
        try {
            savedModel = graphService.updateGraphInstance(graphModel);
        } catch (IllegalArgumentException e) {
            return Errors.Response404NotFound(e.getMessage());
        } catch (Exception e) {
            return Errors.Response500InternalServerError(e.getCause(), e.getMessage());
        }
        return ResponseEntity.ok(savedModel);
    }

    @DeleteMapping("/instance/{id}")
    public ResponseEntity<?> deleteGraphInstance(@PathVariable Long id) {
        try {
            graphService.deleteGraphInstance(id);
        } catch (IllegalArgumentException e) {
            return Errors.Response404NotFound(e.getMessage());
        } catch (Exception e) {
            return Errors.Response500InternalServerError(e.getCause(), e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/create")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, maxAge = 3600, allowedHeaders = "*")
    public ResponseEntity<?> createGraph(@RequestBody GraphModel graphModel) {
        System.out.println("test");
        GraphModel savedModel;
        try {
            savedModel = graphService.createNewLifelongGraph(graphModel);
        } catch (ForbiddenException e) {
            e.printStackTrace();
            return Errors.Response403Forbidden(e.getMessage());
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return Errors.Response400BadRequest(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return Errors.Response500InternalServerError(e.getCause(), e.getMessage());
        }
        return ResponseEntity.ok(savedModel);
    }
}
