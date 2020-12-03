// 映射类型：映射出一个新的类型
// 内置工具类型

// 把接口所有属性变成可读
interface Obj{
    name: string;
    a: string;
    b: string;
}
// type Readonly<T> = { readonly [P in keyof T]: T[P]; };
type ReadonlyObj = Readonly<Obj>

// 将所有属性变成可选
type PartialObj = Partial<Obj>

// 新的类型必须从 Obj 的 a b 属性中选取
type PickObj = Pick<Obj, 'a' | 'b'>

type RecordObj = Record<'x' | 'y' , Obj>