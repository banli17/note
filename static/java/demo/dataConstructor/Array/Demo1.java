package dataConstructor.Array;

public class Demo1 {

    private int[] data;
    private int size;  // 指向数组的第一个空元素

    // 构造函数
    public Demo1(int capacity) {
        data = new int[capacity];
        size = 0;
    }

    public Demo1() {
        this(10);
    }

    public int getSize() {
        return size;
    }

    public int getCapacity() {
        return data.length;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void addLast(int e) {
        add(size, e);
    }

    public void addFirst(int e) {
        add(0, e);
    }

    public void add(int index, int e) {
        if (size == data.length)
            throw new IllegalArgumentException("add error,Array is full");

        if (index < 0 || index > size) {
            throw new IllegalArgumentException("add error,index is error");
        }

        for (int i = size - 1; i >= index; i--) {
            data[i + 1] = data[i];
        }

        data[index] = e;
        size++;
    }
}
