import { Observable } from "rxjs";
import type { Entity } from "../Entity";
import type { EntityComponent } from "../Component/EntityComponent";
import { Optional } from "$lib/Utility/Monads";

export interface IGameSystem<T extends EntityComponent<any>> {
    gsid: number;
    entityComponents: Array<T>;

    subscribeEntityComponent<K extends EntityComponent<any>>(entityComponent: K): void;
    unsubscribeEntityComponent(entityComponentId: number): void;
}

type OptionalObservable = ReturnType<typeof Optional<Observable<any>>>

type GsHandler = (event: any, entityComponent: EntityComponent<any>, entity: Entity) => void

export class GameSystem implements IGameSystem<EntityComponent<any>> {
    gsid: number = -1;
    entityComponents: EntityComponent<any>[];
    subject: OptionalObservable;
    handler: GsHandler;
    
    constructor(handler: GsHandler) {
        this.handler = handler;
        this.entityComponents = [];
        this.subject = Optional<Observable<any>>(null);
    }

    subscribeObservable(observable: Observable<any>): void {
        this.subject = Optional(observable);

        if (this.subject.isPresent) 
            this.subject.value.subscribe((event) => {
                this.entityComponents.forEach((entityComponent) => {
                    if (entityComponent.entity.isPresent) {
                        const entity = entityComponent.entity.value;
                        this.handler(event, entityComponent, entity)
                    }
                })
            });
    }

    subscribeEntityComponent(entityComponent: EntityComponent<any>): void {
        this.entityComponents.push(entityComponent);
    }
    unsubscribeEntityComponent(entityComponentId: number): void {
        this.entityComponents = this.entityComponents.filter((entityComponent) => entityComponent.id.value !== entityComponentId);
    }
}