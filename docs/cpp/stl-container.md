# STL 容器

## vector

### 元素的遍历

对 vector 中元素的遍历可以通过三种方式：

1. 下标遍历
2. 迭代器遍历
3. 语法糖 `:` 遍历

```cpp
vector<int> a = {1, 2, 3};

// 方法一：下标遍历
for(int i = 0; i < a.size(); i++) {
  cout << a[i] << ',';
}
cout << endl;

// 方法二：迭代器遍历
for(vector<int>::iterator it = a.begin(); it != a.end(); it++) {
  cout << *it << ',';
}
cout << endl;

// 方法二：迭代器遍历 + 使用 auto 自动推断类型
for (auto it = a.begin(); it != a.end(); it++) {
  cout << *it << ',';
}
cout << endl;

// 方法三： `:` 语法糖
for (int &num : a) {
  cout << num << ',';
}
cout << endl;

// 方法三： `:` 语法糖 + 使用 auto 自动推断类型
for (auto num : a) {
  cout << num << ',';
}
cout << endl;
```

### 相等的判断

在对两个 vector 用 `==` 做相等判断时，会先比较两个 vector 的 size 是否相同，若相同会再对每一个元素用 `==` 做判断。

```cpp {3,7}
vector<int> a = {1, 2, 3};
vector<int> b = {1, 2, 3};
assert(a == b);

vector<vector <int>> c = {{1, 2}, {3, 4}};
vector<vector <int>> d = {{1, 2}, {3, 4}};
assert(c == d);
```

[Stack Overflow - Can I use ' == ' to compare two vectors?](https://stackoverflow.com/questions/16422486/can-i-use-to-compare-two-vectors-i-tried-it-and-seems-to-be-working-fine)

<Vssue title="C++ STL 容器" />
