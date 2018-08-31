package day4;

public class TestPerson {
    static Person p = new Person();

    public static void main(String[] args) {
        p.say("hello");
        System.out.println(p.a);
    }

    public void say(){

        System.out.println(Person.b);
    }
}
