package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.node;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class NodeMetaData {
    protected String contributor;
    protected Double latency;
    protected Double cpu;
    protected Double ram;
    protected Double disk;
}
