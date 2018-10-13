package day4;

public class Yanghui {
    public static void main(String[] args) {
        // 创建二维数组
        int[][] y = new int[10][];
        for (int i = 0; i < y.length; i++) {
            y[i] = new int[i + 1];
        }

        // 赋值
        for (int i = 0; i < y.length; i++) {
            for (int j = 0; j < y[i].length; j++) {
                y[i][0] = y[i][i] = 1;

                if (i > 1 && j > 0 && j < i) {
                    y[i][j] = y[i - 1][j] + y[i - 1][j - 1];
                }
            }
        }

        // 打印
        for (int i = 0; i < y.length; i++) {
            for (int j = 0; j < y[i].length; j++) {
                System.out.print(y[i][j] + "\t");
            }
            System.out.println();
        }
    }
}
