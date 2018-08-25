import java.util.Random;
import java.util.Scanner;

public class GameDemo {
    public static void main(String[] args) {
        Random r = new Random();

        int number = r.nextInt(100) + 1;

        while (true) {
            Scanner s = new Scanner(System.in);

            System.out.println("请输入要猜的数(1-100)：");

            int guessNumber = s.nextInt();

            if (guessNumber > number) {
                System.out.println("输入的数大了");
            } else if (guessNumber < number) {
                System.out.println("输入的数小了");
            } else {
                System.out.println("恭喜，猜中了");
                break;
            }
        }
    }
}
