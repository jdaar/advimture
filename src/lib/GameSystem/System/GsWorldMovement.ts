import type { EntityComponent } from "$lib/GameSystem/Component/EntityComponent";
import type { GameSystem } from "$lib/GameSystem/System/GameSystem";
import type { IObservable } from "$lib/Utility/Observable";
import type { EcPositional } from "../Component/EcPositional";

export class GsWorldMovement implements GameSystem {
    gsid: number = 0; 

    dissambiguateId: number;
    entityComponents: EntityComponent[];
    
    constructor() {
        // this might cause problems in the future
        this.dissambiguateId = Math.floor(Math.random() * Infinity);
        this.entityComponents = [];
    }

    notify(observable: IObservable): void {
        console.log((observable as EcPositional).position)
    }

    subscribeEntityComponent(entityComponent: EntityComponent): void {
        this.entityComponents.push(entityComponent);
    }
    unsubscribeEntityComponent(entityComponentId: number): void {
        this.entityComponents = this.entityComponents.filter((entityComponent) => entityComponent.id.value !== entityComponentId);
    }
}