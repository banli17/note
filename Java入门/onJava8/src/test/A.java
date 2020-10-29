package test;

class B {
    static double PI = 3.14;
    static void sayHello(){

    }
}

public class A extends B {
    String name = "张三";
    static int age = 12;

    static void say() {
        System.out.println("hello world!");
    }

    public static void main(String[] args) {
        System.out.println(A.PI);
        A.sayHello();

        A.say();  // hello world!
        System.out.println(A.age);  // 12

        A a = new A();
        System.out.println(a.name);
        a.say();   // hello world!
        System.out.println(a.age);  // 12
    }
}

