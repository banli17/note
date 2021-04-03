import math

print('the value of pi is approximately %5.3f.' % math.pi)
# f表示输出浮点数，
# 5表示最小输出字符宽度为5位数，
# 3表示浮点数输出小数点后为3位数


print('{1} and {0} and {other}'.format('spam', 'egg', other='orange'))
# egg and spam and orange

user = 'mike'
print(f'hi {user}')  # hi mike

print(f'{2 * 5}')


class Person:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    # 给用户看时会更友好，print()、控制台、str()、str.format() 调用
    # 如果没有，则会调用 __repr__
    def __str__(self):
        return f'hello {self.first_name}'

    # 解释器调用时。
    def __repr__(self):
        return f'hello {self.last_name}'


me = Person('tom', 'jerry')
print(f'{me}')  # hello tom
print(str(me))  # hello tom
print(repr(me))  # hello jerry

alist = [1]
print(dir(alist))
# ['__add__', '__class__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']

print(help(alist))

"""
hello
"""
class P:
    """
    a 方法用于生成 hello
    """
    def a(self):
        print('hello')
p = P()
help(p)
