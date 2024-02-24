import { EcRegisterEntity, EntityComponent } from "$lib/GameSystem/Component/EntityComponent";

export class Entity {
    id: number;
    // next entity component id
    necid: number;
    private components: EntityComponent[];

    constructor(id: number) {
        this.id = id;
        this.necid = 0;
        this.components = [];
    }

    getNextEntityComponentId() {
        return this.necid++;
    }

    subscribeEntityComponent(component: EntityComponent) {
        EcRegisterEntity(component, this);
        this.components.push(component);
    }

    unsubscribeEntityComponent(entityComponentId: number) {
        this.components = this.components.filter((component) => component.id.value !== entityComponentId);
    }
}
