package day4;

public class TestPerson {
    public TestPerson(){
        System.out.println("调用1");
    }

    public TestPerson(String a ){
        System.out.println("调用2");
    }

    public static void main(String[] args){
        new TestPerson();
    }
}
