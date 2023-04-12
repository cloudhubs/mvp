package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.graph;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.dao.GraphDAO;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.GraphModel;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.MicroserviceGraph;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class GraphService {
    protected final GraphDAO graphDAO;
    public Optional<GraphModel> getGraphInstance(Long id) {
        return graphDAO.findById(id);
    }

    public List<GraphModel> getAllInstancesOfGraph(Long id) {
        return graphDAO.findAllByLifelongId(id);
    }

    public GraphModel saveGraphInstance(GraphModel graph) {
        return graphDAO.save(graph);
    }
}
