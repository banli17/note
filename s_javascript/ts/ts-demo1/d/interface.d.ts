interface List {
    id: number;
    name: string;
}
interface Result {
    data: List[];
}
declare function render(result: Result): void;
declare let result: {
    data: ({
        id: number;
        name: string;
        sex: string;
    } | {
        id: number;
        name: string;
        sex?: undefined;
    })[];
};
interface List0 {
    readonly id: number;
    name: string;
    age?: number;
}
interface StringArray {
    [index: number]: string;
}
declare let chars: StringArray;
interface Names {
    [x: string]: string;
    [z: number]: string;
}
declare let add: (x: number, y: number) => number;
interface Add2 {
    (x: number, y: number): number;
}
declare type Add = (x: number, y: number) => number;
declare let add3: Add;
interface Lib {
    (): void;
    version: string;
    doSomething(): void;
}
declare function getLib(): Lib;
declare let lib1: Lib;
