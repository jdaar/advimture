import { Optional } from "$lib/Utility/Monads";
import type { Entity } from "$lib/GameSystem/Entity";
import type { GameSystem } from "$lib/GameSystem/System/GameSystem";
import { EntityComponent } from "$lib/GameSystem/Component/EntityComponent";

export type EcOptPositional = {
    defaultPosition: { x: number, y: number };
    canMove: boolean;
}

export class EcPositional extends EntityComponent {
    private _position: { x: number, y: number };
    private _canMove: boolean;

    constructor(entity: Entity, opts: EcOptPositional) {
        super(entity, []);
        this.requiredGsids = [0];
        this._position = opts.defaultPosition;
        this._canMove = opts.canMove;
    }

    get position() {
        return this._position;
    }
    set position(pos: {x: number, y: number}) {
        this._position = pos;
        this.notify();
    }
    get canMove() {
        return this._canMove;
    }
    set canMove(cm: boolean) {
        this._canMove = cm;
        this.notify();
    }
} 