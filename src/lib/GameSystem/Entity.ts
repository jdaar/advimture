import { EcRegisterEntity, EntityComponent } from "$lib/GameSystem/Component/EntityComponent";

export class Entity {
    id: number;
    // next entity component id
    necid: number;
    private components: EntityComponent<any>[];
    private perGsComponents: Map<number, EntityComponent<any>[]>;

    constructor(id: number) {
        this.id = id;
        this.necid = 0;
        this.components = [];
        this.perGsComponents = new Map();
    }

    getNextEntityComponentId() {
        return this.necid++;
    }

    getEntityComponentByGsid(gsid: number) {
        return this.perGsComponents.get(gsid);
    }

    subscribeEntityComponent<T>(component: EntityComponent<T>) {
        EcRegisterEntity(component, this);

        component.gameSystems.forEach(gs => {
            const _components = this.perGsComponents.get(gs.gsid) ?? [];
            this.perGsComponents.set(gs.gsid, [..._components, component]);
        })

        this.components.push(component);
    }

    unsubscribeEntityComponent(entityComponentId: number) {
        this.components = this.components.filter((component) => component.id.value !== entityComponentId);
    }
}
