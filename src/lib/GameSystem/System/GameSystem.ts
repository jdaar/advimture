import type { IObserver } from "$lib/Utility/Observable";
import type { EntityComponent } from "../Component/EntityComponent";

export interface GameSystem extends IObserver {
    gsid: number;
    entityComponents: EntityComponent[];

    subscribeEntityComponent(entityComponent: EntityComponent): void;
    unsubscribeEntityComponent(entityComponentId: number): void;
}

