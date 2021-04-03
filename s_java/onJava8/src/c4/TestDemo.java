package c4;

class Base {
    int m;

    public Base(int m) {
        this.m = m + 1;
    }

    Base() {
    }
}

public class TestDemo extends Base {

    public TestDemo() {
        m = m + 1;
    }

    public static void main(String args[]) {
        TestDemo t = new TestDemo();
        System.out.println(t.m);
    }
}
