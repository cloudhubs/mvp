package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.serialization;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Node;
import jakarta.persistence.AttributeConverter;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.Set;

@Slf4j
public class NodeConverter implements AttributeConverter<Set<Node>, String> {
    ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Set<Node> nodeSet) {
        String graphJson = null;
        try {
            graphJson = objectMapper.writeValueAsString(nodeSet);
        } catch (final JsonProcessingException e) {
            log.error("JSON writing error", e);
        }
        return graphJson;
    }

    @Override
    public Set<Node> convertToEntityAttribute(String json) {
        Set<Node> Nodes = null;
        try {
            Nodes = objectMapper.readValue(json, new TypeReference<Set<Node>>() {});
        } catch (final IOException e) {
            log.error("JSON reading error", e);
        }
        return Nodes;
    }
}
