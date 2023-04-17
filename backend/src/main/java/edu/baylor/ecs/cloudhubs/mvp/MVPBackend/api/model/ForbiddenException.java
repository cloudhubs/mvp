package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.model;

public class ForbiddenException extends IllegalArgumentException {
    public ForbiddenException(String s) {
        super(s);
    }
}
