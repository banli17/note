import java.util.Random;

public class RandomDemo {
    public static void main(String[] args) {

        for (int i = 0; i < 10; i++) {
            Random r = new Random();
            int number = r.nextInt(10);
            System.out.println( r);
        }

    }
}

