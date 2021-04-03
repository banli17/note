interface Obj {
    name: string;
    a: string;
    b: string;
}
declare type ReadonlyObj = Readonly<Obj>;
declare type PartialObj = Partial<Obj>;
declare type PickObj = Pick<Obj, 'a' | 'b'>;
declare type RecordObj = Record<'x' | 'y', Obj>;
