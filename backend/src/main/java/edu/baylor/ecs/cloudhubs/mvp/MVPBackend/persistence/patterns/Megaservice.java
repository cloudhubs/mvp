package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.persistence.patterns;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class Megaservice implements AntiPattern{
    protected Integer threshold;

    public Megaservice(Integer threshold){
        this.threshold = threshold;
    }
}
