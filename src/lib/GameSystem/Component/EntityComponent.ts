import { BehaviorSubject } from "rxjs";
import { Entity } from "$lib/GameSystem/Entity";
import { Optional, type OptionalEntity, type OptionalNumber } from "$lib/Utility/Monads";
import type { GameSystem } from "../System/GameSystem";

interface IEntityComponent {
    requiredGsids: Array<number>;

    id: OptionalNumber;
    entityId: OptionalNumber;
    entity: OptionalEntity;
    gameSystems: Array<GameSystem>;
    gameSystemIds: Array<Number>;

    inyectGameSystem(gameSystems: Array<GameSystem>): void;
    inyectEntity(): void;
}

export class EntityComponent<T> extends BehaviorSubject<T> implements IEntityComponent {
    requiredGsids: number[];
    id: OptionalNumber
    entityId: OptionalNumber;
    entity: OptionalEntity;
    gameSystems: Array<GameSystem>;
    gameSystemIds: Array<number>;

    constructor(data: T, entity: Entity, gameSystems: Array<GameSystem>) {
        super(data);
        this.requiredGsids = [];
        this.id = Optional<number>(null);
        this.gameSystemIds = gameSystems.map(gs => gs.gsid);
        this.entityId = Optional(entity.id);
        this.entity = Optional(entity);
        this.gameSystems = gameSystems;
        
        if (this.gameSystems.length > 0) {
            this.gameSystems.forEach(gs => gs.subscribeEntityComponent(this));
        }
    }

    inyectGameSystem(gameSystems: Array<GameSystem>): void {
        this.gameSystems = [...this.gameSystems, ...gameSystems];
        this.gameSystemIds = [...this.gameSystemIds, ...gameSystems.map(gs => gs.gsid)];
        this.inyectEntity();
    }
    
    inyectEntity(): void {
        if (this.entity.isPresent) {
            this.entity.value.subscribeEntityComponent(this);
            this.id = Optional(this.entity.value.getNextEntityComponentId());
        }
    }
}

export function EcRegisterGameSystem<T>(entityComponent: EntityComponent<T>, gameSystem: GameSystem): void {
    entityComponent.gameSystems = [...entityComponent.gameSystems, gameSystem];
    entityComponent.gameSystemIds = [...entityComponent.gameSystemIds, gameSystem.gsid];
}

export function EcRegisterEntity<T>(entityComponent: EntityComponent<T>, entity: Entity): void {
    entityComponent.entity = Optional(entity);
    entityComponent.entityId = Optional(entity.id);
    entityComponent.id = Optional(entity.getNextEntityComponentId());
}