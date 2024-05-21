# 日志文件

虽然大家经常说 MySQL 的 Binlog 文件（也就是 binary log），但其实它只是 MySQL 服务端日志文件的一种，全部的日志文件类型如下：



| 日志类型                           | 日志内容                                                     |
| ---------------------------------- | ------------------------------------------------------------ |
| 错误日志（Error log）              | 记录 MySQL 服务端启动、运行或者关闭时出错的问题              |
| 普通查询日志（General query log）  | 记录 MySQL 客户端的连接和查询语句（读操作）                  |
| 慢查询日志（Slow query log）       | 记录耗时超过 [`long_query_time`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_long_query_time) 的查询语句 |
| 二进制日志（Binary log）           | 记录修改数据的数据（写操作）                                 |
| 接力日志（Relay log）              | 记录从主服务器同步过来的数据变更                             |
| 数据定义日志（DDL log / meta log） | 记录修改、删除表结构等操作                             |

## 二进制日志 Binlog

Binlog 默认开启，它会记录创建表、修改表数据等事件，不会记录 SELECT、SHOW 等查询语句。

## 使用场景

Binlog 的使用场景主要有两个：

1. **数据复制**：用于主从同步等场景，在主机（数据源服务器）上记录的日志，被发送到从机（备份服务器）后，从机根据日志来实现数据的复制。
2. **数据恢复**：当服务器突然出现故障时（例如掉电、误删），可以通过日志文件来恢复数据。

## 日志格式

Binlog 的日志格式有三种，它们的优缺点如下表所示：

| 格式                              | 含义                    | 优点                                                         | 缺点                                                         |
| --------------------------------- | ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 基于语句格式<br />Statement-Based | 记录修改数据的 SQL 语句 | - 写入日志文件的内容更少<br />- 记录了所有的修改语句，可用于审计 | - 不能完美支持全部的修改语句，例如 RAND / UUID / SYSDATE 等<br />- 恢复、复制数据时效率较低，因为需要重新扫表查询等 |
| 基于行格式<br />Row-Based         | 记录被修改的数据        | - 支持所有的数据修改<br />- 效率更高，无需再次查询           | - 写入日志文件的内容多<br />                                 |
| 混合模式<br />Mixed-Based         | 上面两种模式的混合      | - 默认格式👍<br />- 结合了两者的优点                          | - 实现复杂度高                                               |

## 同步机制

默认情况下，每一次写操作都会同步记录到 Binlog（`sync_binlog` 配置为 1）。

但是如果 `sync_binlog` 没有启用的话，那么当服务宕机的时候，可能会导致最后的写操作不会被记录到 Binlog 中。

`sync_binlog` 有如下三个可选的配置值：

1. **0**：关闭 MySQL 服务本身的同步机制，依赖操作系统的写操作。这种方式是最快的，不过服务器断电或者宕机的时候，可能会丢失日志。
2. **1**：每次完成 commit 之前都需要先写入 Binlog 文件，不会丢失事务数据，但是性能稍差，是默认配置。
3. **N**：每 N 次事务 commit 才会写入磁盘。



默认的 **1** 选项是最安全的，不过也是最慢的。

## 参考文档

1. [MySQL Server Logs](https://dev.mysql.com/doc/refman/8.0/en/server-logs.html)
2. [MySQL - Advantages and Disadvantages of Statement-Based and Row-Based Replication](https://dev.mysql.com/doc/mysql-replication-excerpt/8.3/en/replication-sbr-rbr.html)


<Vssue title="MySQL Log" />