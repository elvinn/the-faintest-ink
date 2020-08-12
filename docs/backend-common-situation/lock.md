# 并发中的锁机制

在并发的场景下，可能会涉及到多个请求对同一个数据的修改，那么此时可以通过加锁的机制来避免同时对数据进行修改导致的数据错乱问题。具体而言，有 **乐观锁** 和 **悲观锁** 两种上锁的机制。

## 乐观锁

顾名思义，**乐观锁** 表示在操作的时候非常乐观，认为每次去拿数据的时候别人都不会修改，所以读的时候不会上锁。不过在更新的时候，会判断在此期间数据有没有被更新过：若被更新过，则进行事务回滚或者自动重试。一般而言，会使用 `版本号机制` 或者 `CAS（compare and swap）算法` 实现。

###  版本号机制

该方法通常会在数据表中加上一个版本号 version 字段，进行读写操作时按如下步骤进行：

@flowstart
start=>start: 开始
op_read=>operation: 读取数据（version_A）
op_write=>operation: 准备写数据（version_B）
cond=>condition: 更新数据
  set version = version_B 
  where version = version_A
success=>operation: 写成功
fail=>operation: 写失败，进行回滚或重试
end=>end: 结束

start(bottom)->op_read(bottom)->op_write(bottom)->cond
cond(yes)->success(bottom)->end
cond(no)->fail(right)->end
@flowend


### CAS 算法

CAS(compare and swap) 即比较并替换，主要用于线程并发，有以下特点：

1. 属于原子操作，用于保证并发安全，而不是保证并发同步。
2. 利用 CPU 对 CAS 指令的支持。

具体来说， CAS 将内存中的值与指定数据进行比较，当数值一样时将内存中的数据替换为新的值，在 C 中可以通过如下代码实现:

``` c
int compare_and_swap(int* reg, int oldVal, int newVal) {
  ATOMIC();
  int oldRegVal = *reg;
  if (oldRegVal != oldVal) {
    return 0;
  }
  *reg = newVal;
  END_ATOMIC();
  return 1;
}
```

通过 CAS，我们可以实现一个线程并发安全的加法:

``` c
int add(int* p, int a) {
  int isDone = 0;
  int value = *p;
  while (!isDone) {
    isDone = compare_and_swap(p, value, value + a);
  }
  return value + a;
}
```

需要注意的是虽然 CAS 利用了 CPU 的原子操作指令，实现上比较简单，但是存在两个问题：

1. ABA 问题：CAS 仅能确保写入前内存的值和读取的时候值一致，但无法保证该内存被写过，例如另外一方将原来的值 A 改为 B 后再改为 A 这种情况无法感知。
2. 自旋问题：如果不成功的话，会进行循环重试，那么长时间不成功的话，会带来很大的执行开销

### 适用场景

乐观锁适用于 **读多写少** 的场景，可以尽可能多地让仅读的需求得到满足。

乐观锁不适用于 **读少写多** 的场景，会导致大部分写需求失败。

## 悲观锁

顾名思义，**乐观锁** 表示在操作的时候非常悲观，认为每次去拿数据的时候别人会修改，所以一旦去拿数据，就会将其上锁，不让其它访问者进行读写。

在不同的场景下，悲观锁有不同的实现方法：

1. 全局锁：通过全局可访问的变量作为锁标志，例如文件、信号、共享内存等。
2. Java 锁：可以利用 `synchronized` 锁住方法，或者利用 `ReentrantLock` 实现全局锁。
3. MySQL 排它锁：通过 `for update` 加锁，结合事务进行读写（需特殊关注表级锁/行级锁）。

### 适用场景

悲观锁适用于 **读少写多** 的场景，可以发挥最大能力满足写需求。

悲观锁不适用于 **读多写少** 的场景，会导致大部分仅读需求长时间等待。

## 延伸阅读

1. [美团技术团队 - 不可不说的Java“锁”事](https://tech.meituan.com/2018/11/15/java-lock.html)
2. [掘金 - 全面了解mysql锁机制（InnoDB）与问题排查](https://juejin.im/post/5b82e0196fb9a019f47d1823)
3. [掘金 - 面试必备之乐观锁与悲观锁](https://juejin.im/post/5b4977ae5188251b146b2fc8)

<Vssue title="并发中的锁机制" />
