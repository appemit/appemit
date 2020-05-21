 AppEmit v0.1 测试版本
 
# 1	概述

AppEmit是应用程序（尤其是浏览器）与本地程序间互相通信的易扩展的轻量级中间件。主要采用了HTML5国际标准的Web Socket进行通话，默认为异步， JSON格式传递参数。主要实现功能：
	
	在浏览器播放Flash，包括swf交互动画、flv影视等

	在浏览器打开、操作本地文件，比如办公软件

	开发本地硬件DLL驱动模块的封装插件，实现在网页中操作控制本地的读卡器、打印机、扫描仪、高拍仪、U盾等各种硬件设备

	各个应用程序之间 通信 

程序名称	AppEmit.exe

网址	[http://www.appemit.com](http://www.appemit.com)

Github[https://github.com/appemit/appemit](https://github.com/appemit/appemit)

Email	appemit(at)appemit.com	
 
## 1.1	使用条件

Windows系统，支持XP以上。

## 1.2	用法

下载免安装程序AppEmit（不含插件小于6M），运行AppEmit.exe即可。设置了开机自启动，应避免被杀毒软件关闭。

![目录](https://github.com/appemit/appemit/blob/master/docs/img/1.2.png)

 同时只能开启一个AppEmit.exe进程。
 
	直接运行，如果本机已经运行了AppEmit.exe，则不做处理。

	如果本机已经有程序AppEmit.exe运行，右键以管理员方式运行，则关闭老进程，开启新的进程。

## 1.3	技术实现

Web Socket采用开源控件[HPSocket](https://github.com/ldcsaa/HP-Socket)，支持ssl。

Dll文件开放了C接口，可以在此基础二次开发控件。

	HPSocket4C_U.dll

	HPSocket4C-SSL_U.dll

### 1.3.1	实现过程

在Html的js实现WebSocket，调用AppEmit通话。
```
ws = new WebSocket(wsUrl);  
ws.onopen = function (evt) {};
ws.onmessage = function (evt) {};
ws.onclose = function (evt) {};
```
### 1.3.2	主要步骤，连接授权，发送命令

1.	网页注册后获得设置cid，clientKey，获得连接授权。或者使用临时账户cid=10000-0测试。
2.	连接Appemit服务
initAppEmit("ws://localhost:80/appemit?cid=10000-0&sid=1&flag=1")
3.	设置clientKey授权，(clientKey为私有，发布后需要保密混淆加密js)初始化数据以及授权等
```
var init_AE={
		 "clientKey":"temp-0000000000",  
		  "Browser":ThisBrowser,
		  "wsUrl":wsUrl,
		//  "sid":"1",         
		  "gid":"[1,2]",      
  }

  EmitReq_PaOP(init_AE);
  ```
4.	发送命令

`startAppEmit('{"emit":"hardWare","Obj":"pc"}') `

### 1.3.3	demo
在demo下主要是html的举例，
	包括获取pc信息，实现通话的index.html
	以及播放flash的AppEmbed.html

## 1.4	联系
邮件： appemit@appemit.com


# 2	插件场景

## 2.1	获取客户端信息

使用浏览器打开demo下的index.html。授权连接后，发送获取PC信息命令。

```
initAppEmit("ws://localhost:80/appemit?cid=10000-0&sid=1&flag=1")
startAppEmit('{"emit":"hardWare","Obj":"pc"}') 
```
![PC信息](https://github.com/appemit/appemit/blob/master/docs/img/2.1.png)

2.2	不同客户端通信

打开demo下的index.html,模拟不同sid打开浏览器。
连接Appemit授权后，在sid=1下发送命令。
`{"emit":"msg","toSids":["2,3"],"toGids":[1,2],"data":"hi, I'am Tom."}`
在客户cid全集下，通过唯一的sid对话，可以一对一，或者一对多通话。
 ![1对2和3通话](https://github.com/appemit/appemit/blob/master/docs/img/2.2.png)
图为1对2和3通话。

另外还可以设置不同群gid，一个sid可以加入不同的gid。
发送消息时，在cid全集下，所有的toSids和toGids取对应的sid交集剔重，并排除自身。

2.3	Flash
两种方法，主要四种形式实现场景

1、	使用客户端本地安装的Flash Player ActiveX控件，要是客户端没有，需要自行下载。下载地址：http://www.adobe.com/go/getflashplayer
2、	使用Appemit程序自带的插件plugins/NPSWF32.dll
 ![image](https://github.com/appemit/appemit/blob/master/docs/img/2.1.png)
### 2.3.1	ActiveX形式

#### 2.3.1.1	打开网络flash文件
打开demo下的AppEmbed.html,连接授权后，发送使用ActiveX（"AppType":0）打开网络flash文件命令，参数如下。
```
{"emit":"open","Obj":"flash","AppType":0,"src":"http://img1.yo4399.com/swf/00/0ff035e0e96584c07df65ab3636f72.swf","pos":1,"par0":{"autoPlay":1,"toolbar":0,"rightMenu":0,"hitCaption":0,"hideStop":0,"loop":1,"volumeMute":0,"flashVars":"a=0&b=0&c=SetInSrc"}}
```
注意事项：

在客户端需要下载安装flash player ActiveX。
路径是 / 或许 \\
flashVars可以设置在src中
 ![image](https://github.com/appemit/appemit/blob/master/docs/img/2.3.1.1.png)
 
刷新即可关闭flash

#### 2.3.1.2	打开本地flash文件

可以是绝对或者相对路径，相对于AppEmit.exe的路径："demo/htmlDemo/test1.swf"。
```
{"emit":"open","Obj":"flash","AppType":0,"src":"demo/htmlDemo/test1.swf","pos":1,"par0":{"autoPlay":1,"toolbar":0,"rightMenu":0,"hitCaption":0,"hideStop":0,"loop":1,"volumeMute":0,"flashVars":"a=0&b=0&c=SetInSrc"}}
 ```
 ![image](https://github.com/appemit/appemit/blob/master/docs/img/2.3.1.2.png)
### 2.3.2	NPAPI-嵌入web

能打开常用网页，目前的插件不支持html5的媒体特性。如有需要，可以使用node或者electron插件。
使用Appemit程序自带的插件NPSWF32.dll，能打开嵌有flash的网页。
连接授权后，发送命令"AppType":1的形式。
```
{"emit":"open","Obj":"flash","AppType":1,"src":"http://sxiao.4399.com/4399swf/upload_swf/ftp14/yzg/20140328/bombit7/zx_game7.htm","pos":1}
 ```
  ![image](https://github.com/appemit/appemit/blob/master/docs/img/2.3.2.png)
### 2.3.3	NPAPI-网络flash文件

使用Appemit程序自带的插件NPSWF32.dll， 打开网络flash文件。
连接授权后，发送命令"AppType":2的形式。
```
{"emit":"open","Obj":"flash","AppType":2,"src":"http://sxiao.4399.com/4399swf/upload_swf/ftp18/liuxy/20160130/17801/game.swf","pos":1,"par0":{"autoPlay":true,"loop":true,"quality":"high","wmode":"Transparent"}}
 ```
  ![image](https://github.com/appemit/appemit/blob/master/docs/img/2.3.3.png)
### 2.3.4	NPAPI-网络媒体文件

使用Appemit程序自带的插件NPSWF32.dll， 打开网络媒体文件，包括flv,mp4等。
连接授权后，发送命令"AppType":3的形式。
```
{"emit":"open","Obj":"flash","AppType":3,"src":"https://media.html5media.info/video.mp4","pos":1,"par0":{"autoPlay":1,"loop":1}}
```
  ![image](https://github.com/appemit/appemit/blob/master/docs/img/2.3.4.png)
## 2.4	关闭

1.	刷新即可关闭flash
2.	`{"emit":"close","Obj":"flash"}`
3.	`{"emit":"closeAll","Obj":"flash"}`

## 2.5	其它

请关注。

# 3	参数

## 3.1	连接

ws://localhost:80/appemit?cid=10000-0&sid=1&flag=1

 名称 设置 含义 说明
 协议	  ws	  SSL为wss	
网址   Localhost
127.0.0.1		
Port	80	默认	可以在config.in修改
	443	ssl默认	可以在config.in修改
path	appemit	必需	
para	cid	必需。10000-0为免费账号。	全集。
	sid	可选。唯一session或者用户名ID	测试最好在js中实现
	flag	可选。默认0，非调试。
1调试	

## 3.2	初始化数据
```
var init_AE={
 		"clientKey":"temp-0000000000",  
		"Browser":ThisBrowser,
		"wsUrl":wsUrl,
		 "sid":"123456",        									 
        "gid":"[1,2]"                                             
	 }
```			
名称	设置	含义	说明
客户端clientKey	temp-0000000000	必需,与cid对应。	保密，js应该混淆加密。
Browser	 ThisBrowser	默认	
wsUrl	wsUrl	默认	可以在config.in修改
用户sid		非必需。唯一才可以正常通话。	生产环境，同一设置于此。
群gid	数组	非必需	一个sid可有不同gid

## 3.3	命令

### 3.3.1	硬件信息

`{"emit":"hardWare","Obj":"pc"}`
名称	设置	含义	说明
emit	hardWare	必需。通信请求。	
Obj	pc	必需。目标对象。	

### 3.3.2	通话

`{"emit":"msg","toSids":["2"],"toGids":[1,2],"data":"hi, I'am Tom."}`
名称	设置	含义	说明
emit	msg	必需。通信事件请求。	
toSids	必需要有一个	非必需。可以是数组。	
toGids		非必需。可以是数组。	
data		必需。	

### 3.3.3	打开事件

参数格式如下
名称	设置	含义	说明
emit	open	必需。打开控件APP通信事件请求。	
Obj		必需。
flash默认 
word 后续支持
excel后续支持
CAD后续支持	
par0			

#### 3.3.3.1	"AppType":0打开flash
```
{"emit":"open","Obj":"flash","AppType":0,"src":"http://img1.yo4399.com/swf/00/0ff035e0e96584c07df65ab3636f72.swf","pos":1,"par0":{"autoPlay":1,"toolbar":0,"rightMenu":0,"hitCaption":0,"hideStop":0,"loop":1,"volumeMute":0,"flashVars":"a=0&b=0&c=SetInSrc"}}
```
名称	设置	含义	说明
emit	open	必需。打开控件APP通信事件请求。	
Obj	flash	必需。
flash默认 
word 后续支持
excel后续支持
CAD后续支持	
AppType	0	必需。
0 ActiveX
1 web
2 web flash文件
3 web媒体文件	设为0时，如何本地没有安装ActiveX默认使用方式2打开
src		必需。
	AppType为0时支持本地文件，可以是相对或者绝对路径。
pos	控件APP窗口的位置	必需。
1 默认使用代码识别的位置。	
par0	autoPlay	可选。
0 不自动播放
1自动播放，默认	
	toolbar	可选。
0 没有控制条，默认
1 有控制条	
	rightMenu	可选。
0	
	hitCaption	可选。
0 左按鼠标不能拖动，默认
1 左按鼠标能拖动	
	hideStop	可选。
0 隐藏不见时不停止播放，默认
1隐藏不见时停止播放	
	loop	可选。
0 不自动循环播放， 
1 循环播放，默认	
	volumeMute	可选。
0 不静音，默认
1 静音	
	flashVars	可选。	可以设置在src里面
pos	{"left":372,"top":203,"width":606,"height":406}	必需。
1 默认使用代码自动识别的位置。	对不同的浏览器，自动识别的位置需要优化


#### 3.3.3.2	"AppType":1打开flash
```
{"emit":"open","Obj":"flash","AppType":1,"src":"http://sxiao.4399.com/4399swf/upload_swf/ftp14/yzg/20140328/bombit7/zx_game7.htm","pos":1}
```
名称	设置	含义	说明
emit	open	必需。打开控件APP通信事件请求。	
Obj	flash	必需。	
AppType	1	必需。
0 ActiveX
1 web
2 web flash文件
3 web媒体文件	设为0时，如何本地没有安装ActiveX默认使用方式2打开
src		必需。
	AppType为0时支持本地文件，可以是相对或者绝对路径。
pos	{"left":372,"top":203,"width":606,"height":406}	必需。
1 默认使用代码自动识别的位置。	对不同的浏览器，自动识别的位置需要优化

#### 3.3.3.3	"AppType":2打开flash
```
{"emit":"open","Obj":"flash","AppType":2,"src":"http://sxiao.4399.com/4399swf/upload_swf/ftp18/liuxy/20160130/17801/game.swf","pos":1,"par0":{"autoPlay":true,"loop":true,"quality":"high","wmode":"Transparent"}}
```
名称	设置	含义	说明
emit	open	必需。打开控件APP通信事件请求。	
Obj	flash	必需。	
AppType	3	必需。
0 ActiveX
1 web
2 web flash文件
3 web媒体文件	设为0时，如何本地没有安装ActiveX默认使用方式2打开
src		必需。
	AppType为0时支持本地文件，可以是相对或者绝对路径。
pos	{"left":372,"top":203,"width":606,"height":406}	必需。
1 默认使用代码自动识别的位置。	对不同的浏览器，自动识别的位置需要优化
par0	autoPlay	可选。默认true	参考flash官方默认参数。
	loop	可选。默认true	参考flash官方默认参数。
	quality	可选。默认high	参考flash官方默认参数。
	wmode	可选。默认Transparent	参考flash官方默认参数。

#### 3.3.3.4	"AppType":3打开flash
```
{"emit":"open","Obj":"flash","AppType":3,"src":"https://media.html5media.info/video.mp4","pos":1,"par0":{"autoPlay":1,"loop":1}}
```
名称	设置	含义	说明
emit	open	必需。打开控件APP通信事件请求。	
Obj	flash	必需。	
AppType	3	必需。
0 ActiveX
1 web
2 web flash文件
3 web媒体文件	设为0时，如何本地没有安装ActiveX默认使用方式2打开
src		必需。
	AppType为0时支持本地文件，可以是相对或者绝对路径。
pos	{"left":372,"top":203,"width":606,"height":406}	必需。
1 默认使用代码自动识别的位置。	对不同的浏览器，自动识别的位置需要优化
par0	autoPlay	可选。默认1	参考
https://player.alicdn.com/aliplayer/setting/setting.html
	loop	可选。默认1	
	
### 3.3.4	关闭

#### 3.3.4.1	关闭sid对应APP

`{"emit":"close","Obj":"flash"}`

名称	设置	含义	说明
emit	close	必需。关闭控件APP通信事件请求。	
Obj	flash	必需。	

#### 3.3.4.2	关闭cid所有APP

`{"emit":"closeAll","Obj":"flash"}`

名称	设置	含义	说明
emit	close	必需。关闭所有控件APP通信事件请求。	关闭在cid下运行的所有控件APP
Obj	flash	必需。
	

# 4	问题
1.	支持linux mac？

目前版本不支持，使用在windows系统上。
2.	免费版本有何限制条件？

会不定时有弹窗。
3.	测试点击连接，为何没有反应？ 

首先要打开AppEmit.exe服务，可以F12查看报错情况。重启系统后，AppEmit.exe进程自动开启，没有被关闭。
4.	如何开发插件？

使用HPSocket的C接口。目前在测试中。

