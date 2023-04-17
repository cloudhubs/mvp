package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.dao;

import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.GraphModel;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GraphDAO extends JpaRepository<GraphModel, Long> {
    List<GraphModel> findAllByGraphName(@NotNull String name);
    boolean existsByGraphName(@NotNull String name);
}
