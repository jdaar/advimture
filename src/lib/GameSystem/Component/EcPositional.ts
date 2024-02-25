import type { Entity } from "$lib/GameSystem/Entity";
import { EntityComponent } from "$lib/GameSystem/Component/EntityComponent";

export type EcDataPositional = {
    position: { x: number, y: number };
    canMove: boolean;
}

export type EcOptPositional = {
    default: EcDataPositional;
}

export class EcPositional extends EntityComponent<EcDataPositional> {
    constructor(entity: Entity, opts: EcOptPositional) {
        super(opts.default, entity, []);
        this.requiredGsids = [0];
    }
} 