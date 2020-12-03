declare function A<T>(value: T): T;
declare let a: string;
declare class Log<T> {
    run(value: T): T;
}
declare let log1: Log<number>;
declare let log2: Log<unknown>;
interface Length {
    length: number;
}
declare function log<T extends Length>(value: T): T;
