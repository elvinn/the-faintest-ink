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