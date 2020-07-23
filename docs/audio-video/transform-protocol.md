# 传输协议

在零几年的时候，想要看视频往往需要先将视频文件完整地下载到本地，然后再进行播放。经过了十多年的时间，如今已经可以在线直接播放视频，而且能随意拖曳进度条，这样的变化多亏于音视频背后传输协议的演变。

视频的封装协议决定了音视频信息的组织方式，视频的传输协议则决定了这些信息如何从服务器端传输到客户端。就例如下图中，封装格式就类似于集装箱般组织数据，而传输协议则就像船一样，负责将数据传输给用户。

![tranform ship](./public/transform-ship.jpg)

视频播放主要分为点播和直播两个场景，不同的场景适用不同的传输协议，不过有些协议也可以同时应用于两个场景值，我们先通过表格来整体看一下：

|            | HTTP 渐进式下载                  | HLS                                              | HTTP-FLV    | RTMP       | webRTC |
| :--------: | -------------------------------- | ------------------------------------------------ | ----------- | ---------- | ------ |
|  适用场景  | 点播                             | 点播、直播                                       | 点播、直播  | 直播       | 直播   |
|  简单介绍  | 过渡性方案，一边下载一边播放     | 将视频文件拆分成许多个小文件，然后通过 HTTP 传输 |             |            |        |
|   传输层   | HTTP 长连接                      | HTTP 短连接                                      | HTTP 短连接 | TCP 长连接 | UDP    |
| 实现复杂度 | 简单                             | 简单                                             | 简单        | 复杂       | 复杂   |
|  启播延时  | 很长                             | 很长                                             |             |            |        |
| 网络适应性 | -                                |                                                  |             |            |        |
| 客户端依赖 | 原生支持                         |                                                  |             | Flash      |        |
|    优点    | 实现非常简单                     |                                                  |             |            |        |
|    缺点    | “伪流媒体”，用户停止播放仍会下载 | 延时长（10秒）                                   |             |            |        |



## HLS

HLS 的全称是 HTTP Live Streaming，翻译下就是基于 HTTP 的流媒体传输协议，由苹果公司在 2009 年推出。

服务器端提前将视频文件拆分成许多小片段（常称为切片，封装格式为 `ts`），并得到含有全部分片信息的 M3U8 文件，然后分发给 CDN 网络，最后通过 HTTP 协议传输给用户，因而架构上非常简便。

客户端在看视频的时候，会先请求 M3U8 文件，然后再根据网络状况来加载对应的视频切片，整体流程如下：

@flowstart
start=>start: 开始
op_fetch_master_playlist=>operation: 请求 M3U8 格式的 master playlist
op_parse_master_palylist=>operation: 解析数据，得到适用不同分辨率的 media playlist（同样是 M3U8 格式）
op_fetch_media_playlist=>operation: 根据设备状况，请求对应分辨率的 media playlist
op_parse_media_playlist=>operation: 解析数据，得到不同分片对应的 HTTP 连接
op_download_ts=>operation: 下载分片并播放
end=>end: 结束

start(bottom)->op_fetch_master_playlist(bottom)->op_parse_master_palylist
op_parse_master_palylist(bottom)->op_fetch_media_playlist(bottom)->op_parse_media_playlist
op_parse_media_playlist(bottom)->op_download_ts(bottom)->end
@flowend







1. 切片的**封装格式**是 `ts`。
2. 

