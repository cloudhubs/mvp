package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.graph;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.model.ForbiddenException;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.model.NotFoundException;
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
    public Optional<GraphModel> getGraphInstance(Long instanceId) {
        return graphDAO.findById(instanceId);
    }

    public List<GraphModel> getAllInstancesOfGraph(String graphName) {
        return graphDAO.findAllByGraphName(graphName);
    }

    public GraphModel newGraphInstance(GraphModel graphModel) {
        if (!graphDAO.existsByGraphName(graphModel.getGraphName())) {
            throw new NotFoundException("This graph identifier is not currently in use");
        }
        AntiPatternLabeler labeler = new AntiPatternLabeler(graphModel.toGraph());
        MicroserviceGraph newGraph = labeler.labelAll();
        graphModel.setGraph(newGraph);

        return graphDAO.save(graphModel);
    }

    public GraphModel createNewLifelongGraph(GraphModel graphModel) {
        System.out.println(graphModel.getGraphName());
        if (graphDAO.existsByGraphName(graphModel.getGraphName())) {
            System.out.println("BAD" + graphModel.getGraphName());
            throw new ForbiddenException("This graph identifier is in use");
        }
        else if (graphModel.getGraphName() == null) {
            throw new IllegalArgumentException("graphName must be a uniquer identifier for graph");
        }

        AntiPatternLabeler labeler = new AntiPatternLabeler(graphModel.toGraph());
        MicroserviceGraph newGraph = labeler.labelAll();
        graphModel.setGraph(newGraph);

        return graphDAO.save(graphModel);
    }

    public void deleteGraphInstance(Long id) {
        if (!graphDAO.existsById(id)) {
            throw new IllegalArgumentException("Graph of this id does not exist");
        }
        graphDAO.deleteById(id);
    }

    public GraphModel updateGraphInstance(GraphModel graphModel) {
        deleteGraphInstance(graphModel.getInstanceId());
        return this.newGraphInstance(graphModel);
    }
}
