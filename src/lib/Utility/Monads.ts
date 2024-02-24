import type { Entity } from "$lib/GameSystem/Entity";
import type { GameSystem } from "$lib/GameSystem/System/GameSystem";

type Optional<T> = {
    isPresent: boolean;
    value: T;
};

export function Optional<T>(value: T | null): Optional<T> {
    return {
        isPresent: value !== null,
        value: value as T
    };
}

export type OptionalNumber = ReturnType<typeof Optional<number>>;
export type OptionalEntity = ReturnType<typeof Optional<Entity>>;
export type OptionalGameSystem = ReturnType<typeof Optional<GameSystem>>;
