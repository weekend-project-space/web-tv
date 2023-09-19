# WebTV

web tv , online stream tv , support m3u m3u8 , Support real-time subtitle translation

## Online

[01234.fun](http://01234.fun)

## Deploy your own

One click deployment to Vercel

[![deploy](https://camo.githubusercontent.com/5e471e99e8e022cf454693e38ec843036ec6301e27ee1e1fa10325b1cb720584/68747470733a2f2f76657263656c2e636f6d2f627574746f6e)](https://vercel.com/new/clone?repository-url=https://github.com/weekend-project-space/web-tv)

## mobile - tv online

[tv-online](https://github.com/weekend-project-space/tv-online)

## Setup

```
npm install

npm run serve
```

- localhost:5173/#/?url=xxx.m3u8||xxx.mp4

- localhost:5173/#/?s=xxx.json||xxx.txt||xxx.m3u

## Simple

**query params**

- s: tv list source
- url: video url & caption:(only support vtt)

**tvlist**

http://01234.fun?s=https://raw.githubusercontent.com/imDazui/Tvlist-awesome-m3u-m3u8/master/m3u/%E5%85%A8%E5%9B%BD%E6%99%AF%E5%8C%BA%E6%BA%90.m3u8

[tvlist source file](./public/tvlist.txt)

**openclass (Support real-time subtitle translation)**

http://01234.fun?s=/openclass/openclass.txt

[openclass source file](./public/openclass/openclass.txt)

## TV information source

- https://owen2000wy.github.io/

- https://github.com/imDazui/Tvlist-awesome-m3u-m3u8

- https://github.com/iptv-org/iptv

## QA:

- subtitle translation Incomplete display?

  set Subtitle font 50%

- srt not support?

  [srt-to-vtt](https://www.veed.io/tools/subtitle-converter/srt-to-vtt)
