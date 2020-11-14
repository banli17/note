package c3;

public class GeneralTest {
    public static void main(String[] args) {
        ShowType st = new ShowType();
        GeneralType<Integer> i = new GeneralType<Integer>(2);
        GeneralType<String> s = new GeneralType<String>("hello");

        st.show(i);
        st.show(s);
    }
}
