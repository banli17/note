// 异常
// 1. throw 可以抛出任何对象
// 2. catch 子句可以是多个，on需要指定异常类型，用 catch 捕获
//    - on Exception
//    - on Exception catch(e)
//    - catch
// 3. rethrow 继续将错误往上抛

fn1() {
  try {
    throw FormatException('异常了'); // 可以抛出任何对象，如 throw 'hello'
  } catch (e) {
    print('异常了');
    rethrow;
  }
}

main() {
  try {
    fn1();
  } on FormatException {
    print('捕获 FormatException 异常');
  } on Exception catch (e) {
    print('未知的异常 $e');
  } catch (e) {
    print(e);
  } finally {
    print('finally');  // 无论是否有异常都可以运行
  }
}
