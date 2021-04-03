package c5;

import java.io.*;

public class CopyFileTest {
    public static void main(String[] args) {
        if (args.length == 2) {
            new CopyMaker().copy(args[0], args[1]);
        } else {
            System.out.println("请输入正确的文件名");
        }
    }
}


class CopyMaker {
    String sourceName, destName;
    BufferedReader source;
    BufferedWriter dest;
    String line;

    private boolean openFile() {
        try {
            source = new BufferedReader(new FileReader(sourceName));
        } catch (IOException e) {
            System.out.println("source: " + e);
            return false;
        }
        try {
            dest = new BufferedWriter(new FileWriter(destName));
        } catch (IOException e) {
            System.out.println("dest: " + e);
            return false;
        }
        return true;
    }

    private boolean copyFiles() {
        try {
            line = source.readLine();
            while (line != null) {
                dest.write(line);
                dest.newLine();
                System.out.println("写入：" + line);
                line = source.readLine();
            }
        } catch (IOException e) {
            return false;
        }
        return true;
    }

    private boolean closeFile() {
        boolean ret = true;
        try {
            source.close();
            dest.close();
        } catch (IOException e) {
            ret = false;
        }
        return ret;
    }

    public boolean copy(String src, String dst) {
        sourceName = src;
        destName = dst;
        return openFile() && copyFiles() && closeFile();
    }

    public static void main(String[] args) {

    }
}
