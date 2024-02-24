import { Entity } from "$lib/GameSystem/Entity";
import type { GameSystem } from "$lib/GameSystem/System/GameSystem";
import { Optional, type OptionalEntity, type OptionalGameSystem, type OptionalNumber } from "$lib/Utility/Monads";
import { Observable } from "$lib/Utility/Observable";

interface IEntityComponent {
    requiredGsids: Array<number>;

    id: OptionalNumber;
    entityId: OptionalNumber;
    entity: OptionalEntity;
    gameSystems: Array<GameSystem>;
    gameSystemIds: Array<Number>;

    inyectGameSystem(gameSystems: Array<GameSystem>): void;
}

export class EntityComponent extends Observable implements IEntityComponent {
    requiredGsids: number[];
    id: OptionalNumber
    entityId: OptionalNumber;
    entity: OptionalEntity;
    gameSystems: Array<GameSystem>;
    gameSystemIds: Array<number>;

    constructor(entity: Entity, gameSystems: Array<GameSystem>) {
        // lil janky tbh
        super(Math.floor(Math.random() * Infinity));

        this.requiredGsids = [];
        this.id = Optional<number>(null);
        this.gameSystemIds = gameSystems.map(gs => gs.id);
        this.entityId = Optional(entity.id);
        this.entity = Optional(entity);
        this.gameSystems = gameSystems;

        if (this.gameSystems.length > 0) {
            this.gameSystems.forEach(gs => gs.subscribeEntityComponent(this));
        }
        if (this.entity.isPresent) {
            this.entity.value.subscribeEntityComponent(this);
            this.id = Optional(entity.getNextEntityComponentId());
        }
    }

    inyectGameSystem(gameSystems: Array<GameSystem>): void {
        this.gameSystems = [...this.gameSystems, ...gameSystems];
        this.gameSystemIds = [...this.gameSystemIds, ...gameSystems.map(gs => gs.id)];
        gameSystems.forEach(gs => this.subscribe(gs));
    }
}

export function EcRegisterGameSystem(entityComponent: EntityComponent, gameSystem: GameSystem): void {
    entityComponent.gameSystems = [...entityComponent.gameSystems, gameSystem];
    entityComponent.gameSystemIds = [...entityComponent.gameSystemIds, gameSystem.id];
}

export function EcRegisterEntity(entityComponent: EntityComponent, entity: Entity): void {
    entityComponent.entity = Optional(entity);
    entityComponent.entityId = Optional(entity.id);
    entityComponent.id = Optional(entity.getNextEntityComponentId());
}