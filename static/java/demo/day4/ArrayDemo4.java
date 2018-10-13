package day4;

public class ArrayDemo4 {
    public static void main(String[] args) {
        int[] arr = new int[]{1, 2, 5, 9, 3};

        for (int i = 0; i < arr.length / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[arr.length - 1 - i];
            arr[arr.length - 1 - i] = temp;
        }

        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
        }
    }
}
