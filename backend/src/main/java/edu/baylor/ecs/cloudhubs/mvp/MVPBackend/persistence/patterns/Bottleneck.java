package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class Bottleneck implements AntiPattern{

    protected Integer threshold;



    public Bottleneck(Integer threshold) {
        this.threshold = threshold;
    }
}
