package c5;

public class ThrowTest {
    public static void main(String[] args) {
        try {
            throw new ArithmeticException("helo");
        } catch (Exception e) {
            System.out.println(e);
            System.out.println(e.getMessage());
        }
    }
}
