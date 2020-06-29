# 常用技巧

## 遍历二维数组中元素周边的八个元素

在面对二维数组的问题时，经常需要访问中心元素（图中黄块）的相邻八个元素（图中灰块）。

![相邻的八个元素](./public/neighbors.jpg)

我们可以借助一个方向数组来进行遍历，从而避免手写上下左右的位置计算：

``` js {1,8-9}
const directions = [-1, 0, 1] // 方向数组

let centerX = 1
let centerY = 1

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const pointX = centerX + directions[i]
    const pointY = centerY + directions[j]
    if (pointX === centerX && pointY === centerY) {
      // 跳过中心点
      continue;
    }

    doSomeThing(pointX, pointY)
  }
}
```