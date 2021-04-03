declare class Dog {
    constructor(name: string);
    name: string;
    run(): void;
    private pri;
    protected pro(): void;
    readonly sex: number;
    static maxAge: number;
    sleep(): void;
    eat(): void;
}
declare let dog: Dog;
declare class Husky extends Dog {
    color: string;
    constructor(name: string, color: string);
}
declare abstract class Animal {
    eat(): void;
    abstract sleep(): void;
}
declare class Cat extends Animal {
    sleep(): void;
}
declare let cat: Cat;
declare let animals1: Animal[];
declare class WorkFlow {
    step1(): this;
    step2(): this;
}
declare class MyFlow extends WorkFlow {
    next(): this;
}
interface Human {
    name: string;
    eat(): void;
}
declare class Asian implements Human {
    name: string;
    constructor(name: string);
    eat(): void;
}
interface Man extends Human {
    run(): void;
}
interface Child {
    cry(): void;
}
interface Boy extends Man, Child {
}
declare let boy: Boy;
declare class Auto {
    state: number;
    private state2;
}
interface AutoInterface extends Auto {
}
declare class C implements AutoInterface {
    state: number;
}
declare class Bus extends Auto implements AutoInterface {
}
