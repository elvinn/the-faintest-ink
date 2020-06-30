# STL 容器

## vector

### 相等的判断

在对两个 vector 用 `==` 做相等判断时，会先比较两个 vector 的 size 是否相同，若相同会再对每一个元素用 `==` 做判断。

``` cpp {3,7}
vector<int> a = {1, 2, 3};
vector<int> b = {1, 2, 3};
assert(a == b);

vector<vector <int>> c = {{1, 2}, {3, 4}};
vector<vector <int>> d = {{1, 2}, {3, 4}};
assert(c == d);
```

[Stack Overflow - Can I use ' == ' to compare two vectors?](https://stackoverflow.com/questions/16422486/can-i-use-to-compare-two-vectors-i-tried-it-and-seems-to-be-working-fine)