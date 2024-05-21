# 日志文件

虽然大家经常说 MySQL 的 binlog 文件（也就是 binary log），但其实它只是 MySQL 服务端日志文件的一种，全部的日志文件类型如下：



| 日志类型                           | 日志内容                                                     |
| ---------------------------------- | ------------------------------------------------------------ |
| 错误日志（Error log）              | 记录 MySQL 服务端启动、运行或者关闭时出错的问题              |
| 普通查询日志（General query log）  | 记录 MySQL 客户端的连接和查询语句（读操作）                  |
| 慢查询日志（Slow query log）       | 记录耗时超过 [`long_query_time`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_long_query_time) 的查询语句 |
| 二进制日志（Binary log）           | 记录修改数据的数据（写操作）                                 |
| 接力日志（Relay log）              | 记录从主服务器同步过来的数据变更                             |
| 数据定义日志（DDL log / meta log） | 记录修改、删除表结构等操作                             |

## 参考文档

1. [MySQL Server Logs](https://dev.mysql.com/doc/refman/8.0/en/server-logs.html)

## 二进制日志 Binlog

<Vssue title="MySQL Log" />