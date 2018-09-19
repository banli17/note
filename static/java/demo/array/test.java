package array;

public class test {
    public static void main(String[] args) {
        int[] a = new int[3];
        a[0] = 1;
        for (int i = 0; i < a.length; i++) {
            System.out.println(a[i]);  // 1,0,0
        }

        int[] b = new int[]{5, 4, 2};
        for (int i = 0; i < b.length; i++) {
            System.out.println(b[i]);  // 5,4,2
        }

        float[] f = new float[2];
        for (int i = 0; i < f.length; i++) {
            System.out.println(f[i]);  // 0.0
        }

        String[] s = new String[2];
        for (int i = 0; i < s.length; i++) {
            System.out.println(s[i]);  // null
        }

    }
}
