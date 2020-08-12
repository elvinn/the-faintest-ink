# 文件描述符 File Descriptor

Linux 系统把一切都看做是文件，具体可分为：

- 普通文件（regula file）
- 目录文件（directory）
- 块设备文件（block device file）
- 字符设备文件（character device file）
- 套接字文件（socket file）
- 管道文件（named pipe）
- 链接文件（symbolic link）

为了管理这些文件，内核会为已被打开的文件创建一个索引，值为非负整数，用于指向这些文件。所有 IO 操作相关的系统调用都会通过文件描述符进行。 

具体说来，Linux 系统的每一个进程启动后，会在内核空间中创建一个控制块（Process Control Block），其内部有一个文件描述符表（File Descriptor Table），用于记录当前进程处于打开状态的文件。文件描述符则可以看作是这个表的行号，每次打开文件时，会根据该表找到最小可用的文件描述符号码来占用。

## 标准输入/输出/错误的文件描述符

对于 Linux 系统中的任意进程，`0/1/2` 这三个文件描述符的作用是相同的，如下表所示。

| 文件描述符   |   用途     |    POSIX 名次    |  stdio 流  |
| :--------: | :--------: | :-------------: | :--------: |
|     0      | 标准输入 | STDIN_FILENO  | stdin    |
|     1      | 标准输出 | STDOUT_FILENO | stdout   |
|     2      | 标准错误 | STDERR_FILENO | Stderr   |


<Vssue title="Linux 文件描述符" />
