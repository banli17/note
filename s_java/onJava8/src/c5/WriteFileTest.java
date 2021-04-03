package c5;

import java.io.*;

public class WriteFileTest {
    public static void main(String[] args) throws IOException {
        // chmod 111 hello.txt 修改文件为只读
        String fileName = "hello.txt";
        try {
            // 第二个参数为是否追加
            FileWriter fw = new FileWriter(fileName, true);
            fw.write("hello \n");
            fw.write("This is my first text file\n");
            fw.write("You can see how this is done\n");
            fw.write("输入一行中文也可以\n");
            fw.close();
        } catch (IOException e) {
            System.out.println(fileName + ": " + e.getMessage());
        }
    }
}
