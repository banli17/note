package innerclasses;

// 内部类的作用2： 返回对象
// 要注意：内部可以用 outerClass.innerClass 或者 innerClass，外部必须要 outerClass
public class Parcel2 {
    class Contents {
        private int i = 11;

        public int value() {
            return i;
        }
    }

    class Destination {
        private String label;

        Destination(String whereTo) {
            label = whereTo;
        }

        String readLabel() {
            return label;
        }
    }

    // 使用内部类 Destination
    public void ship(String dest) {
        Contents c = new Contents();
        Destination d = new Destination(dest);
        System.out.println(d.readLabel());
    }

    public Contents contents() {
        return new Contents();
    }

    public Destination to(String s) {
        return new Destination(s);
    }

    public static void main(String[] args) {
        Parcel2 p = new Parcel2();
        p.ship("Tasmania");

        Parcel2 q = new Parcel2();
        Parcel2.Contents c = q.contents();
        Parcel2.Destination d = q.to("Borneo");
    }
}
