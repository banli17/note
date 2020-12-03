// T extends U ? X : Y

type TypeName<T> = 
    T extends string ? 'string' :
    T extends number ? 'number' :
    T extends boolean ? 'boolean' :
    T extends undefined ? 'undefined':
    T extends Function ? 'function' :
    'object'

type T1 = TypeName<string>
type T2 = TypeName<string[]>

// (A|B) extends U ? X : Y
// (A extends U ? X : Y) | (B extends U ? X : Y)
type T3 = TypeName<string | string[]>

// 从T 中过滤掉 U
type Diff<T, U> = T extends U ? never : T
type T4 = Diff<'a'|'b'|'c', 'a' | 'e'>
type NotNull<T> = Diff<T, undefined|null>
type T5 = NotNull<string |number | undefined | null>

let t5: T5 = 'hi'

// ts 已经实现
// Exclude(T, U)
// NonNullable<T>
// Extract<T, U>
type T6 = Extract<'a'|'b'|'c', 'a'>

// ReturnType<T>
type T7 = ReturnType<()=> string>
