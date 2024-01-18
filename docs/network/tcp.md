# TCP 协议

## 为什么初始序列号是随机的？

主要是为了增加第三方攻击者伪造数据包的难度，因为 IP 是可以伪造的，所以理论上第三方攻击者可以伪造一个合法的报文，这个时候接收方可以通过数据包的序列号来进行一个过滤，如果序列号不在滑动窗口的范围内，就进行丢弃。

那么当初始序列号是随机的时候，就增大了攻击者伪造合法序列号的难度，不然如果默认从 0 开始的话，就很容易猜测到当前的滑动窗口范围了。

## 为什么需要三次握手？

在 [RFC 793 - TCP](https://datatracker.ietf.org/doc/html/rfc793) 第 32 页，英文解释了三次握手的原因： *The principle reason for the three-way handshake is to prevent old duplicate connection initiations from causing confusion.*，翻译一下就是说三次握手主要是为了避免旧的、重复的初始化请求导致的混乱。

文档中举了如下的一个的例子：

``` txt {5,7,11}
      TCP A                                                TCP B

  1.  CLOSED                                               LISTEN

  2.  SYN-SENT    --> <SEQ=100><CTL=SYN>               ...

  3.  (duplicate) ... <SEQ=90><CTL=SYN>               --> SYN-RECEIVED

  4.  SYN-SENT    <-- <SEQ=300><ACK=91><CTL=SYN,ACK>  <-- SYN-RECEIVED

  5.  SYN-SENT    --> <SEQ=91><CTL=RST>               --> LISTEN


  6.              ... <SEQ=100><CTL=SYN>               --> SYN-RECEIVED

  7.  SYN-SENT    <-- <SEQ=400><ACK=101><CTL=SYN,ACK>  <-- SYN-RECEIVED

  8.  ESTABLISHED --> <SEQ=101><ACK=401><CTL=ACK>      --> ESTABLISHED

                    Recovery from Old Duplicate SYN

                               Figure 9.
```

上述例子中：
  - 由于网络的异常延迟等原因，`TCP A` 端发出 `<SEQ=90><CTL=SYN>` 的包仍在传递，未到达 `TCP B` 端，也就是第 3 步
  - `TCP A` 在一段时间仍未收到响应数据后，重新发送了 `<SEQ=100><CTL=SYN>` 包进行初始化，也就是第 2 步
  - `<SEQ=90><CTL=SYN>` 先到达 `TCP B`，`<SEQ=100><CTL=SYN>` 的包后到达 `TCP B`

若两次握手就可以建立链接，那么 `TCP B` 依次返回 `<SEQ=300><ACK=91><CTL=SYN,ACK>` 和 `<SEQ=400><ACK=101><CTL=SYN,ACK>` 后，`TCP A` 和 `TCP B` 之间就建立了两条 TCP 链接通道，导致了资源的浪费和与预期不符的行为。

所以加上了第三次握手，当 `TCP A` 收到 `<SEQ=300><ACK=91><CTL=SYN,ACK>` 这个对于 SEQ=90 序列包的确认信息时，会返回 `<SEQ=91><CTL=RST>`，也就是通过 `RST` 这个重置信号告诉 `TCP B` 将状态切换成初始的 `LISTEN` 状态。

<Vssue title="TCP 协议" />
