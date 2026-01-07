# 移动语义

移动语义（Move Sematic）是 C++ 11 标准里引入的特性，它的提出主要是为了解决在复制对象时，调用拷贝构造函数带来的巨大开销问题。

## 拷贝构造函数的巨大开销

首先来看一段代码：

```cpp
class Test {
    int * arr{nullptr};
public:
    Test():arr(new int[5000]{1,2,3,4}) { 
    	cout << "default constructor" << endl;
    }
    Test(const Test & t) {
        cout << "copy constructor" << endl;
        if (arr == nullptr) arr = new int[5000];
        memcpy(arr, t.arr, 5000*sizeof(int));
    }
    ~Test(){
        cout << "destructor" << endl;
        delete [] arr;
    }
};

Test createTest() {
    return Test();
}

int main() {
    Test t(createTest());
}
```

编译执行后它的输出为:

```
default constructor
copy constructor
destructor
copy constructor
destructor
destructor
```

::: tip
因为 GCC 丧心病狂的优化能力，默认的编译选项会进行 RVO（Return Value Optimization）,所以需要关闭优化后编译才能看到同样的输出：

`g++ -std=c++11 -fno-elide-constructors test.cpp`
:::

在这段代码中，通过 `createTest` 工厂函数来构造了 `Test` 的实例。需要注意的是，其中 `Test(const Test & t) {...}` 这个复制构造函数被调用了两次，相当于复制了 2 * 5000 = 10000 个元素，开销是非常大的。并且这两次调用其实并没有什么意义，因为 `createTest` 中创建的的实例在函数返回时就会被析构，而用于其返回值的 `Test` 临时实例也会在 `main` 中复制给 `t` 之后被析构。

在这种情况下，就可以通过移动语义来避免没必要的复制，从而提升程序的性能。

## 移动构造函数（Move Constructor）

在利用移动构造函数来解决问题之前，我们需要先了解左值和右值的区别：

- 左值：可寻址的变量，也就是真正的存在内存当中，而不是寄存器中的值。
- 右值：非左值的即为右值，无法寻址。

其中左值的引用符号为 `&`（传统的 C++ 引用），右值的引用符号为 `&&` （C++ 11 引入的新特性）。

利用右值引用，我们可以实现如下的移动构造函数：

```cpp {12-15}
class Test {
    int * arr{nullptr};
public:
    Test():arr(new int[5000]{1,2,3,4}) { 
    	cout << "default constructor" << endl;
    }
    Test(const Test & t) {
        cout << "copy constructor" << endl;
        if (arr == nullptr) arr = new int[5000];
        memcpy(arr, t.arr, 5000*sizeof(int));
    }
    Test(Test && t): arr(t.arr) {
        cout << "move constructor" << endl;
        t.arr = nullptr;
    }
    ~Test(){
        cout << "destructor" << endl;
        delete [] arr;
    }
};
```

当再次执行之前提到的代码时候：

```cpp
Test createTest() {
    return Test();
}

int main() {
    Test t(createTest());
}
```

它的输出是：

``` txt {2,4}
default constructor
move constructor
destructor
move constructor
destructor
destructor
```

可以注意到之前输出的两次 `copy constructor` 变成了 `move constructor`，也就是仅调用了移动构造函数，节省了之前调用两次构造复制函数的开销。

这里需要关注一下 Test 的移动构造函数中 `t.arr = nullptr;` 这行代码，它通过将临时对象中的 `arr` 置空，从而避免了临时对象在析构时释放这块内存，影响复制得到的对象。

还有 `完美转发（Perfect Forward）` / `通用引用（Universal Reference）` 等相关的内容可以深究，下面这篇文章很不错，强烈推荐：

1. [C++移动语义及拷贝优化](https://theonegis.github.io/cxx/C-%E7%A7%BB%E5%8A%A8%E8%AF%AD%E4%B9%89%E5%8F%8A%E6%8B%B7%E8%B4%9D%E4%BC%98%E5%8C%96/index.html)

<Vssue title="C++ 移动语义" />
