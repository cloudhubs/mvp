package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = CyclicDependency.class, name = "Cyclic Dependency"),
        @JsonSubTypes.Type(value = Bottleneck.class, name = "Bottleneck"),
        @JsonSubTypes.Type(value = Megaservice.class, name = "Megaservice"),
})
public interface AntiPattern {
}
