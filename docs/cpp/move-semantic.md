# 移动语义

移动语义（Move Sematic）是 C++ 11 标准里引入的特性，它的提出主要是为了解决在复制对象时，调用拷贝构造函数带来的巨大开销问题。

## 拷贝构造函数的巨大开销

首先来看一段代码：

``` cpp
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

在这段代码中，通过 `createTest` 工厂函数来构造了 `Test` 的实例。需要注意的是，其中 `Test(const Test & t) {...}` 这个复制构造函数被调用了两次，相当于复制了 2 * 5000 = 10000 个元素，开销是非常大的。并且这两次调用其实并没有什么意义，因为 `createTest` 中创建的的实例在函数返回时就会被析构，而用于其返回值的 `Test` 临时实例也会在 `main` 中复制给 `t` 之后被析构。

在这种情况下，就可以通过移动语义来避免没必要的复制，从而提升程序的性能。

## 移动构造函数（Move Constructor）

在利用移动构造函数来解决问题之前，我们需要先了解左值和右值的区别：

- 左值：可寻址的变量，也就是真正的存在内存当中，而不是寄存器中的值