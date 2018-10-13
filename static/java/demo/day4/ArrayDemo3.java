package day4;

public class ArrayDemo3 {
    public static void main(String[] args) {
        int[] arr = new int[]{4, 10, 20, 11, 3};

        int max = arr[0], min = arr[0], sum = 0, q = 0;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
            if (arr[i] < min) {
                min = arr[i];
            }

            sum += arr[i];
        }

        q = sum / arr.length;

        System.out.println("最大值是：" + max);
        System.out.println("最小值是：" + min);
        System.out.println("和是：" + sum);
        System.out.println("平均值是：" + q);
    }
}
