package c5;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class ReadFileTest {
    public static void main(String[] args) throws IOException {
        // chmod 111 hello.txt 修改文件为只读
        String fileName = "hello.txt";
        int c;
        try {
            // 第二个参数为是否追加
            FileReader in = new FileReader(fileName);
            // 文件末尾会返回 -1
            while ((c = in.read()) != -1) {
                System.out.println((char) c);
            }
            in.close();
        } catch (IOException e) {
            System.out.println(fileName + ": " + e.getMessage());
        }
    }
}
