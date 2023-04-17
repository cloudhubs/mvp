package edu.baylor.ecs.cloudhubs.mvp.MVPBackend.api.model;

public class NotFoundException extends IllegalArgumentException {
    public NotFoundException(String error) {
        super(error);
    }
}
