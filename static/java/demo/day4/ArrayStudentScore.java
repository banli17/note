package day4;

import java.util.Scanner;

public class ArrayStudentScore {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);

        System.out.println("请输入学生个数");
        int num = s.nextInt();
        int max = 0;

        int[] scores = new int[num];
        for (int i = 0; i < num; i++) {
            System.out.println("请输入学生" + (i + 1) + "的成绩：");
            int score = s.nextInt();
            scores[i] = score;

            if (max < score) {
                max = score;
            }
        }

        System.out.println("学生最高分是：" + max);
    }
}
