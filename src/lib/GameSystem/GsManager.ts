import { log } from "$lib/Utility/Logging";
import type { EntityComponent } from "./Component/EntityComponent";
import type { GameSystem } from "./System/GameSystem";

export class GsManager {
    gsMap = new Map<number, GameSystem>();

    registerGameSystem(gs: GameSystem): void {
        this.gsMap.set(gs.gsid, gs);
    }

    inyectGsToEc(entityComponent: EntityComponent): void {
        entityComponent.requiredGsids.forEach((gsid) => {
            const gs = this.gsMap.get(gsid);
            if (gs) {
                entityComponent.inyectGameSystem([gs]);
            } else {
                log("error", "GameSystem not found in GsManager.inyectGsToEc()")
            }
        });
    }
}