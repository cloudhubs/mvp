package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.graph.serialization;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node.Link;
import jakarta.persistence.AttributeConverter;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.Set;

@Slf4j
public class LinkConverter implements AttributeConverter<Set<Link>, String> {
    ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Set<Link> nodeSet) {
        String graphJson = null;
        try {
            graphJson = objectMapper.writeValueAsString(nodeSet);
        } catch (final JsonProcessingException e) {
            log.error("JSON writing error", e);
        }
        return graphJson;
    }

    @Override
    public Set<Link> convertToEntityAttribute(String json) {
        Set<Link> links = null;
        try {
            links = objectMapper.readValue(json, new TypeReference<Set<Link>>() {});
        } catch (final IOException e) {
            log.error("JSON reading error", e);
        }
        return links;
    }
}
