import { Observable, fromEvent } from "rxjs";
import { GameSystem } from "$lib/GameSystem/System/GameSystem";
import type { EcPositional } from "../Component/EcPositional";
import type { Entity } from "../Entity";

export class GsWorldMovement extends GameSystem {
    gsid: number = 0; 

    constructor() {
        super((event, entityComponent, entity) => {
            const ec = entityComponent as EcPositional;
            console.log("GsWorldMovement", ec.getValue().position, entity.getEntityComponentByGsid(0));
        });
    }
}