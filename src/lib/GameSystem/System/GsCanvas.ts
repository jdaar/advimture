import { GameSystem } from "$lib/GameSystem/System/GameSystem";
import type { EcGraphic } from "../Component/EcGraphic";

export class GsCanvas extends GameSystem {
    gsid: number = 1; 

    constructor() {
        super((event, entityComponent, entity) => {
            const ec = entityComponent as EcGraphic;
            console.log("GsWorldMovement", ec.getValue().resource, entity.getEntityComponentByGsid(0));
        });
    }
}