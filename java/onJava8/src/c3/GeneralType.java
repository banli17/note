package c3;

class GeneralType<Type> {
    Type object;

    public GeneralType(Type object) {
        this.object = object;
    }

    public Type getObj() {
        return object;
    }
}

class ShowType {
    public void show(GeneralType<?> o) {
        System.out.println(o.getObj().getClass().getName());
    }
}
