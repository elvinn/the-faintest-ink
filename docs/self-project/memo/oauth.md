# Oauth 登录

为了实现数据的同步，需要一套账号体系，考虑到用户的方便，决定使用 Oauth 进行登录，无需用户再专门注册账号。

在 [RFC 6749 标准](https://tools.ietf.org/html/rfc6749) 中，讲述了 Oauth 2.0 的核心功能就是向第三方应用颁发令牌（Access Token），并规定了四种获取令牌的方式，具体为：

- 授权码（Authorization Code）：第三方应用先申请一个授权码，再用授权码去换取令牌。
- 隐藏式（Implicit）：第三方应用前端直接获取令牌。
- 密码式（Resource Owner Password Credentials）：第三方应用用账户名、密码换取令牌。
- 客户端凭证（Client Credentials）：第三方应用通过命令行等方式换取令牌。

可以用如下的表格进行一个对比：

|             | 授权码                                                       | 隐藏式 | 密码式 | 客户端凭证                                                   |
| ----------- | ------------------------------------------------------------ | ------ | ------ | ------------------------------------------------------------ |
| 安全性      | 高                                                           | 低     | 低     | 高                                                           |
| 接入复杂度  | 复杂                                                         | 简单   | 简单   | 较复杂                                                       |
| Github 支持 | 支持（[web application flow](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#web-application-flow)） | 不支持 | 不支持 | 支持（[device flow](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#device-flow)） |



国内使用比较多的微信扫码登录是 Oauth 2.0 中的授权码模式，不过由于需要以公司的身份进行申请，所以目前 [memo](https://elvinn.cn/memo-vue/) 仅支持 Github  登录。

## Github 登录

### 登录流程


     +----------+
     | Resource |
     |   Owner  |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier      +---------------+
     |         -+----(A)-- & Redirection URI ---->|               |
     |  User-   |                                 | Authorization |
     |  Agent  -+----(B)-- User authenticates --->|     Server    |
     |          |                                 |               |
     |         -+----(C)-- Authorization Code ---<|               |
     +-|----|---+                                 +---------------+
       |    |                                         ^      v
      (A)  (C)                                        |      |
       |    |                                         |      |
       ^    v                                         |      |
     +---------+                                      |      |
     |         |>---(D)-- Authorization Code ---------'      |
     |  Client |          & Redirection URI                  |
     |         |                                             |
     |         |<---(E)----- Access Token -------------------'
     +---------+       (w/ Optional Refresh Token)


上图是在 [RFC 6749 标准](https://tools.ietf.org/html/rfc6749) 中规定的授权码模式标准流程，Github 第三方登录中的[web application flow](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps#web-application-flow) 也是按照这个来实现的，主要的流程为：

1. 用户在浏览器第三方网站中点击 Github 登录。
2. 浏览器跳转到 Github 页面进行登录和授权。
3. 授权成功后，浏览器跳转到第三方网站指定页面，链接携带授权码（Authorization Code）。
4. 第三方网站请求自己的后台接口，让后台服务通过授权码和密钥去获取令牌（Access Token）。
5. 第三方网站通过令牌向 Github 获取用户相关信息。

### 问题记录

1. 为什么需要授权码去换取令牌？第三步中，Github 重定向至第三方网站指定页面时，链接直接携带令牌岂不是更简单吗？

   主要是考虑到安全的问题，假如在第三步中的重定向链接中直接携带令牌的话，那么网络中的节点都可以获取到令牌，然后凭此向 Github 获取用户信息，从而造成用户信息的泄漏。所以第三步中的跳转链接应仅携带授权码，然后第三方业务凭借授权码和密钥两个东西才能证明自己的身份，去 Github 获取令牌。

2. 为什么在腾讯云的云函数中进行登录时，偶尔会发生失败呢？

   查询日志，典型的问题是 `Error: connect ECONNREFUSED 13.250.168.23:443\n  at TCPConnectWrap.afterConnect [as oncomplete] `，同时考虑到墙的存在，发现这是某些云函数的实例对 Github 的网络不通导致的失败。

### 参考资料

1.  [RFC 6749 标准 - Oauth 2.0](https://tools.ietf.org/html/rfc6749) 
2. [Github Docs - Authorizing OAuth Apps](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps)

<Vssue title="memo Oauth 登录" />
