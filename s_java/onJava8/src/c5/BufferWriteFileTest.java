package c5;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BufferWriteFileTest {
    public static void main(String[] args) throws IOException {
        // chmod 111 hello.txt 修改文件为只读
        String fileName = "hello.txt";
        try {
            // 第二个参数为是否追加
            FileWriter fw = new FileWriter(fileName, true);
            BufferedWriter out = new BufferedWriter(fw);
            out.write("hello \n");
            out.write("This is my first text file");
            out.newLine();  // 跨平台的换行符
            out.write("You can see how this is done\n");
            out.write("输入一行中文也可以\n");
            out.close();
        } catch (IOException e) {
            System.out.println(fileName + ": " + e.getMessage());
        }
    }
}
