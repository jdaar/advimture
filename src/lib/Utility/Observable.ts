export interface IObserver {
    dissambiguateId: number;
    notify(observable: IObservable): void;
}

export interface IObservable {
    observers: IObserver[];
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
    notify(): void;
}

export class Observable implements IObservable {
    observers: IObserver[];

    constructor(id: number) {
        this.observers = [];
    }
    subscribe(observer: IObserver): void {
        this.observers.push(observer);
    }
    unsubscribe(observer: IObserver): void {
        this.observers = this.observers.filter((obs) => obs.dissambiguateId !== observer.dissambiguateId);
    }
    notify(): void {
        this.observers.forEach((observer) => observer.notify(this));
    }
}