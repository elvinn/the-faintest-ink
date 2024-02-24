# 字符串

## 字符串的字节长度

在封装企业微信群机器人消息接口调用库时，看到 [官方文档](https://developer.work.weixin.qq.com/document/path/91770) 写的是“*文本内容，最长不超过 2048 个字节，必须是 utf8 编码*”。一开始理解成**2048** 是对字符串长度的限制，但是在编写测试用例时发现长度超过 3000 的字符串也能调通接口，仔细研究了一下发现一个是**字节长度**，一个是**字符串长度**，两个的区别很大：

```js
const str = "Hello, 你好";
console.log(str.length); // 字符串长度: 9
console.log(Buffer.from(str, 'utf-8').length); // 字节长度: 13
```

在 UTF-8 编码下，英文占 1 个字节，大多数中文字符占 3 个字节，极少部分特殊字符（例如 Emoji 表情符号）占 4 个字符。

## String.raw

对于一些含有转义字符的字符串，例如 Windows 下的路径 `C:\Program Files (x86)\Tencent`，使用 `String.raw` 可以很方便的表示，节省转义字符 `\`：

- 传统表示：'C:\\\\Program Files (x86)\\\\Tencent'
- 模板字符串表示：String.raw\`C:\Program Files (x86)\Tencent\`