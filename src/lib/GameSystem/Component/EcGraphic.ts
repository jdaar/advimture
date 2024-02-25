import type { Entity } from "$lib/GameSystem/Entity";
import { EntityComponent } from "$lib/GameSystem/Component/EntityComponent";

export type EcDataGraphic = {
    resource: string;
    backgroundColor: string;
    borderColor: string;
}

export type EcOptGraphic = {
    default: EcDataGraphic;
}

export class EcGraphic extends EntityComponent<EcDataGraphic> {
    constructor(entity: Entity, opts: EcOptGraphic) {
        super(opts.default, entity, []);
        this.requiredGsids = [1];
    }
} 