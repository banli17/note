package c5;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class BufferReadFileTest {
    public static void main(String[] args) throws IOException {
        // chmod 111 hello.txt 修改文件为只读
        String fileName = "hello.txt", line;
        try {
            // 第二个参数为是否追加
            FileReader fr = new FileReader(fileName);
            BufferedReader in = new BufferedReader(fr);
            line = in.readLine();  // 一行行的读取
            while (line != null) {
                System.out.println(line);
                line = in.readLine();  // 一行行的读取
            }

            in.close();
        } catch (IOException e) {
            System.out.println(fileName + ": " + e.getMessage());
        }
    }
}
