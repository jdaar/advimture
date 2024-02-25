import { log } from "$lib/Utility/Logging";
import type { EntityComponent } from "./Component/EntityComponent";
import type { GameSystem } from "./System/GameSystem";

export class GsManager {
    gsMap = new Map<number, GameSystem>();

    registerGameSystem<T extends GameSystem>(gs: T): void {
        this.gsMap.set(gs.gsid, gs);
    }

    inyectGsToEc<T extends EntityComponent<any>>(entityComponent: T): void {
        entityComponent.requiredGsids.forEach((gsid) => {
            const gs = this.gsMap.get(gsid);
            if (gs) {
                gs.subscribeEntityComponent(entityComponent);
                entityComponent.inyectGameSystem([gs]);
            } else {
                log("error", "GameSystem not found in GsManager.inyectGsToEc()")
            }
        });
    }
}