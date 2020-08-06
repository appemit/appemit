AppEmit  v0.9.3

#  概述  [English](https://github.com/appemit/appemit/blob/master/README.md)

AppEmit是应用程序（尤其是浏览器）与本地程序间互相通信的易扩展的轻量级中间件。主要采用了HTML5标准的Web Socket进行通话，默认为异步， JSON格式传递参数。
	
### 主要功能：

 - 1  在几乎所有浏览器播放含有flash的网页或Flash文件，包括swf交互动画、flv影视等
 - 2  在浏览器打开、操作本地文件，比如阅读PDF；创建、阅读、编辑Office文件，且支持JavaScript代码操作
 - 3  在浏览器中调用第三方DLL、OCX组件以及系统winApi函数，tcc、python、lua等
 - 4  开发本地硬件DLL驱动模块的封装插件，实现在网页中操作控制本地的读卡器、打印机、扫描仪、高拍仪、U盾等各种硬件设备
 - 5  各个应用程序之间通信，比如聊天
 - 6  在Chrome里嵌入IE内核网页，保护源码，可以不修改原有的ActiveX读取html，同时支持开源内核wke和blink

### 解决问题

1)	国际市场份额68%以上的chrome浏览器（数据来源Netmarketshare；国内25%以上）在2020年12月后不再支持flash(NPAPI)，而微软的edge也不支持ActiveX。

2)	客户习惯使用浏览器来处理各种业务,能调用IE内核。

3)	游戏商、银行、医院、电力、硬件等企业客户使用dll、ActiveX、flash等文件的场景需要。

 
程序名称	AppEmit.exe

网址	[http://www.appemit.com](http://www.appemit.com)

Github[https://github.com/appemit/appemit](https://github.com/appemit/appemit)

Email	appemit(at)appemit.com	

[github下载地址 ](https://raw.githubusercontent.com/appemit/appemit/master/dist/AppEmit.zip)

[国内使用内容分发下载地址，更新有滞后 ](https://cdn.jsdelivr.net/gh/appemit/appemit@master/dist/AppEmit.zip)


### Github 的目录说明

~~~
 ├ dist           下载此文件夹的zip压缩包即可。已经包含了NPSWF和帮助文档demo
 ├ docs         略过
 ├ plugins      含有更多的插件，使用时自动安装，如果局域网使用请自行下载。
 ├ README.md 
 └ README_zh.md
~~~

##  使用条件

Windows系统，支持XP以上。
 

##  技术依赖

- Web Socket采用开源控件[HPSocket](https://github.com/ldcsaa/HP-Socket)，支持ssl。
 - Dll文件开放了C接口，可以在此基础二次开发控件。
 - HPSocket4C_U.dll HPSocket4C-SSL_U.dll
- IE内核调用flash Active控件
- 非IE内核调用flash NPAPI控件
- webkit内核采用开源软件wke控件
- blink内核采用开源软件miniblink控件

 
## 使用
 
1.	下载AppEmit文件压缩包（**dist**目录下，不含插件小于6M），运行AppEmit.exe一次即可。设置了开机自启动，应避免被杀毒软件关闭。同时只能开启一个AppEmit.exe进程。
2. 网页注册获得设置cid，clientKey，获得连接授权。打开demo文件夹里面的html文件或者主页的demo连接或者使用临时账户cid=00000-1测试。
3.	后台初始化Appemit连接服务
     `initAppEmit("ws://localhost:80/appemit?cid=00000-1&sid=1&flag=1")`
4.	设置clientKey授权，(clientKey为私有，发布后需要保密混淆加密js)初始化数据以及授权等

```
var init_AE={
		 "clientKey":"temp-0000000000",  
		  "browser":ThisBrowser,
		  "wsUrl":wsUrl,
		//  "sid":"1",         
		  "gid":"[1,2]",      
  }

  EmitReq_PaOP(init_AE);
  ```
5	发送命令

`startAppEmit('{"emit":"hardWare","Obj":"pc"}') `
6	关闭命令，如果打开了App，自动关闭

`{"emit":"close","Obj":"flash"}  `

###   demo
在demo下主要是html的举例，
	包括获取pc信息，实现通话的index.html
	以及播放flash的AppEmbed.html
或者在线测试
[AppEmbed App](http://www.appemit.com/demo/AppEmbed.html)

[Demo](http://www.appemit.com/demo/index.html)

- 嵌入IE
![嵌入IE](https://cdn.jsdelivr.net/gh/appemit/appemit@master/docs/img/3_appemit_IE.gif)

- 嵌入flash swf
 ![image](https://cdn.jsdelivr.net/gh/appemit/appemit@master/docs/img/1_appemit_ActiveX.gif)
 
 - 嵌入office word, JavaScript控制
  ![image](https://cdn.jsdelivr.net/gh/appemit/appemit@master/docs/img/5_office_word_js.gif)
 

##  联系

邮件： appemit(at)appemit.com
 
##	常见问题

1.	支持linux mac？

目前版本不支持，使用在windows系统上。

2.	免费版本有何限制条件？

免费版本，没有功能限制，但是每80次消息发送时有弹窗。

收费版本没有限制，有企业版和VIP企业版，包括支持局域网。

3.	测试点击连接，为何没有反应？ 

首先要打开AppEmit.exe服务，可以F12查看报错情况。重启系统后，AppEmit.exe进程自动开启，没有被关闭。

4.	如何开发插件？

使用HPSocket的C接口。目前在测试中。

