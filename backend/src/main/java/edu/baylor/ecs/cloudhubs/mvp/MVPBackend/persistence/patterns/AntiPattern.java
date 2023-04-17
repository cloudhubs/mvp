package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = CyclicDependency.class, name = "Cyclic Dependency"),
})
public interface AntiPattern {
    /**
     * Get the name of this anti-pattern
     * @return name
     */
    Long getId();
}
