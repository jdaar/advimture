import { Entity } from "./Entity";

export class EnManager {
    // next entity id
    private nenid: number = 0;
    entities: Map<number, Entity> = new Map();

    private getNextEntityId() {
        return this.nenid++;
    }

    createEntity() {
        const entity = new Entity(this.getNextEntityId());
        this.entities.set(entity.id, entity);
        return entity;
    }

    getEntity(id: number) {
        return this.entities.get(id);
    }

    removeEntity(id: number) {
        this.entities.delete(id);
    }
}