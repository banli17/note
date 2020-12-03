declare function add1(x: number, y: number): number;
declare let add2: (x: number, y: number) => number;
declare type add3 = (x: number, y: number) => number;
interface add4 {
    (x: number, y: number): number;
}
declare function add5(x: number, y?: number): void;
declare function add6(x: number, y: number | undefined, z: number): void;
declare function add7(x: number, ...rest: number[]): number;
declare function add8(...rest: number[]): number;
declare function add8(...rest: string[]): string;
