AppEmit v0.6.0

# 1. Overview
 
AppEmit is a lightweight, scalable middleware that communicates with each other between applications, especially browsers. Web Socket, which mainly uses HTML5 standard, is called by default, and the JSON format passes parameters.
	
## Key implementations of the functions:
1) Play web pages or Flash files with flash in your browser, including swf interactive animations, flv movies, etc.

2) Open and operate local files in a browser, such as office software

3) Develop a encapsulated plug-in for local hardware DLL driver modules to operate and control local card readers, printers, scanners, high cameras, U shields and other hardware devices in the web page

4) Communication between applications, such as chat

5) Embedding the IE kernel web page in Chrome allows you to read html without modifying the original ActiveX, while supporting open source kernels wke and blink

## Solve the problem with the problem

1) Chrome browsers with an international market share of more than 68% (data source Netmarketshare; more than 25% domestic) will no longer support flash (NPAPI) after December 2020, while Microsoft's edge does not support ActiveX.

2) Customers are used to using browsers to handle a variety of business, can call the IE kernel.

3) Gamers, banks, hospitals, power, hardware, and other enterprise customers using dll, ActiveX, flash and other files need to be required.


Program name AppEmit.exe

Website[http://www.appemit.com ](http://www.appemit.com)

Github[https://github.com/appemit/appemit ](https://github.com/appemit/appemit)

Email appemit(at) appemit.com

[GitHub download address ](https://raw.githubusercontent.com/appemit/appemit/master/dist/AppEmit.zip)

[content distribution download address, update lag ](https://cdn.jsdelivr.net/gh/appemit/appemit/dist/AppEmit.zip)


### Github directory description
~~~
  ├dist      :  download the zip compression package for this folder.   included NPSWF
  ├docs      :  skipped
  ├plugins    :  contain more plug-ins, when using automatically installed, if the LAN use please download.
  ├README.md
  └README_zh.md
~~~
 
## 1.1 service conditions

Windows system, support XP or above.

## 1.2 usage

Download the installation free program appemit (excluding plug-ins less than 6m), run AppEmit.exe Just. It is set to start up automatically and avoid being shut down by antivirus software.

![contents](https://cdn.jsdelivr.net/gh/appemit/appemit/docs/img/1.2.png)

Only one can be opened at the same time AppEmit.exe Process.

Direct operation, if the machine is already running AppEmit.exe , no processing.

If there are already procedures on this machine AppEmit.exe Run, right-click to run in administrator mode, then close the old process and start a new process.

## 1.3 technical realization

Web socket adopts open source control [hpsocket](https://github.com/ldcsaa/HP-Socket), support SSL.

The DLL file opens the C interface, on which the control can be redeveloped.

 HPSocket4C_ U.dll

 HPSocket4C-SSL_ U.dll

### 1.3.1 implementation process

In the JS of HTML, websocket is implemented to call the appemit call.

```
ws = new WebSocket(wsUrl);
ws.onopen = function (evt) {};
ws.onmessage = function (evt) {};
ws.onclose = function (evt) {};
```

### 1.3.2 main steps, connection authorization, sending command

1. After the web page is registered, it is set with CID and clientkey to obtain connection authorization. Or test with temporary account CID = 00000-1.

2. Connect to the appemit service

initAppEmit("ws:// localhost:80/appemit?cid=00000-1&sid=1&flag=1 ""

3. Set the clientkey authorization (clientkey is private, and JS needs to be encrypted after publishing) initialization data and authorization, etc

```
var init_ AE={
"clientKey":"temp-0000000000",
"browser":ThisBrowser,
"wsUrl":wsUrl,
// "sid":"1",
"gid":"[1,2]",
}
EmitReq_ PaOP(init_ AE);
```

4. Send command

`startAppEmit('{"emit":"hardWare","Obj":"pc"}') `

###  1.3.3 demo

In demo, it is mainly an example of HTML,

Including obtaining PC information to realize the communication index.html

And flash player AppEmbed.html

## 1.4 contact

Mail: appemit(at)appemit.com


# 2. Plug in scenario 

(please refer to the latest PDF file description in the download documents. )

## 2.1 obtaining client information

Use the browser to open the index.html 。 After authorized connection, send the command to get PC information.


```
initAppEmit("ws:// localhost:80/appemit?cid=00000-1&sid=1&flag=1 ""
startAppEmit('{"emit":"hardWare","Obj":"pc"}')
```

![PC information](https://cdn.jsdelivr.net/gh/appemit/appemit/docs/img/2.1.png)

2.2 communication between different clients

Open the index.html , simulate different Sid to open browser.

After connecting to the approval authority, send the command under sid = 1.

`{"emit":"msg","toSids":["2,3"],"toGids":[1,2],"data":"hi, I'am Tom."}`

In the full set of customer CID, one-to-one or one to many calls can be made through a unique Sid conversation.

![1 to 2 and 3 calls](https://cdn.jsdelivr.net/gh/appemit/appemit/docs/img/2.2.png)

The picture shows 1-to-2 and 3 calls.

In addition, different groups of GIDS can be set, and a SID can add different GIDS.

When sending a message, under the full set of CID, all the tosids and togids take the corresponding Sid intersection to get rid of duplication and exclude themselves.

2.3 Flash

Two methods, mainly four forms of implementation scenarios

1. Use the flash player ActiveX control installed locally on the client. If the client does not have it, you need to download it by yourself. Download address: http://www.adobe.com/go/getflashplayer

2. Use the plug-in plugins / npswf32.dll provided with the appemit program

![image](https://cdn.jsdelivr.net/gh/appemit/appemit/docs/img/2.1.png)

 
 ### 2.3.1 ActiveX form

#### 2.3.1.1 open network flash file

Open the AppEmbed.html , after the connection is authorized, send the command to open the network flash file using ActiveX ("AppType":4). The parameters are as follows.

```
{"emit":"open","Obj":"flash","AppType":4,"src":" http://img1.yo4399.com/swf/00/0ff035e0e96584c07df65ab3636f72.swf ","pos":1,"par0":{"autoPlay":1,"toolbar":0,"rightMenu":0,"hitCaption":0,"hideStop":0,"loop":1,"volumeMute":0,"flashVars":"a=0&b=0&c=SetInSrc"}}
```

matters needing attention:

You need to download and install flash player ActiveX on the client.

The path is / maybe\\

Flashvars can be set in SRC

![image](https://cdn.jsdelivr.net/gh/appemit/appemit/docs/img/1_appemit_ActiveX.gif)

Refresh to turn off flash

#### 2.3.1.2 open local flash file

Can be absolute or relative path, relative to AppEmit.exe Path to: 'demo / htmldemo / test1. SWF'.

```
{"emit":"open","Obj":"flash","AppType":4,"src":"demo/htmlDemo/test1.swf","pos":1,"par0":{"autoPlay":1,"toolbar":0,"rightMenu":0,"hitCaption":0,"hideStop":0,"loop":1,"volumeMute":0,"flashVars":"a=0&b=0&c=SetInSrc"}}
```

![image](https://cdn.jsdelivr.net/gh/appemit/appemit/docs/img/2.3.1.2.png)

### 2.3.2 npapi embedded Web

The current plug-in does not support the media features of HTML5. If necessary, you can use the node or electronic plug-in.

Using the plug-in npswf32.dll of the appemit program, you can open the webpage with flash embedded.

After connecting authorization, send the command "apptype": 1.

```
{"emit":"open","Obj":"flash","AppType":1,"src":" http://sxiao.4399.com/4399swf/upload_ swf/ftp14/yzg/20140328/bombit7/zx_ game7.htm","pos":1}
```

![image](https://cdn.jsdelivr.net/gh/appemit/appemit/docs/img/2.3.2.png)

### 2.3.3 npapi network flash file

Open the network flash file by using the plug-in npswf32.dll of the appemit program.

After connecting authorization, send the command "apptype": 2.

```
{"emit":"open","Obj":"flash","AppType":2,"src":" http://sxiao.4399.com/4399swf/upload_ swf/ftp18/liuxy/20160130/17801/ game.swf ","pos":1,"par0":{"autoPlay":true,"loop":true,"quality":"high","wmode":"Transparent"}}
```

![image](https://cdn.jsdelivr.net/gh/appemit/appemit/docs/img/2.3.3.png)

### 2.3.4 npapi network media file

Use the plug-in npswf32.dll of the appemit program to open network media files, including flv, MP4, etc.

After connecting authorization, send the command "apptype": 3.

```
{"emit":"open","Obj":"flash","AppType":3,"src":" https://media.html5media.info/video.mp4 ","pos":1,"par0":{"autoPlay":1,"loop":1}}
```

![image](https://cdn.jsdelivr.net/gh/appemit/appemit/docs/img/2.3.4.png)

## 2.4 close

1. Refresh to turn off flash

2. `{"emit":"close","Obj":"flash"}`

3. `{"emit":"closeAll","Obj":"flash"}`

##  2.5 Web

### 2.4.1 IE kernel

"Apptype": 1 use IE kernel to open web page

{"emit":"open","Obj":"web","AppType":1,"pos":1,"par":{"htmlStr":null,"HttpServer_ startUrl":null,"URL":" http://www.appemit.com "},"par0":{"header":null,"noScriptErr":true, "UIFLAG":null,"DLCTL":null,"userAgent":null,"crossDomain":true}}

Set htmlstr to open the HTML source directly.

Set httpserver_ Starturl, you can open the local HTML file.

Set the URL to open the web page. 

The priority of the three factors decreased in turn.

  ![image](https://cdn.jsdelivr.net/gh/appemit/appemit/docs/img/3_appemit_IE.gif)
  

### 2.4.2 WebKit kernel

"Apptype": 2 use WebKit kernel to open web page

{"emit":"open","Obj":"web","AppType":2,"pos":1,"par":{"htmlStr":null,"HttpServer_ startUrl":null,"URL":" http://www.appemit.com "},"par0":{"header":null, "userAgent":null,"crossDomain":true}}

Set htmlstr to open the HTML source directly.

Set httpserver_ Starturl, you can open the local HTML file.

Set the URL to open the web page. 

The priority of the three factors decreased in turn.

Please pay attention.

###2.4.3 blink kernel
 "AppType"：3 use the open source blink kernel (webkit enhanced) to open web pages
 "{ emit"："open","Obj"："web","AppType"：3,"pos"：1,"par"：{"htmlStr"：null,"HttpServer_startUrl"：null,"URL"："http://www.appemit.com "}," par0"：{"header"：null,"userAgent"：null,"crossDomain"：true}}"

 Set htmlStr can directly open html source code.
 set HttpServer_startUrl, can open local html files.
 set URL open the web page. The three priorities fall in turn.
 
 
# 3. Parameters
(please refer to the latest PDF file description in the download documents. )
## 3.1 connection

ws:// localhost:80/appemit?cid=00000-1&sid=1&flag=1

Description of name setting Meaning

Protocol WS SSL is WSS

Website: localhost

127.0.0.1

Port 80 can be set in config.in modify

443 SSL can be used in config.in modify

Path append required

Para CID required. 00000-1 is a free account. Complete.

Sid optional. The unique session or user ID test is best implemented in JS

Flag optional. Default 0, not debug.

1 commissioning

## 3.2 initialization data

```
var init_ AE={
"clientKey":"temp-0000000000",
"browser":ThisBrowser,
"wsUrl":wsUrl,
"sid":"123456",
"gid":"[1,2]"
}
```
Description of name setting Meaning

Client clientkey temp 0000000000 is required, corresponding to CID. Confidentiality, JS should confuse encryption.

Browser thisbrowser default

Wsurl wsurl default can be found in config.in modify

User sid is not required. The only way to talk normally. Production environment, the same setting here.

Group GID array unnecessary a SID can have different GIDS
## 3.3 command

### 3.3.1 hardware information

`{"emit":"hardWare","Obj":"pc"}`

Description of name setting Meaning

Emit hardware is required. Communication request.

Obj PC required. Target object.

### 3.3.2 call

`{"emit":"msg","toSids":["2"],"toGids":[1,2],"data":"hi, I'am Tom."}`

Description of name setting Meaning

Emit MSG required. Communication event request.

Tosids must have a nonessential. It can be an array.

Togids is not required. It can be an array.

Data is required.

### 3.3.3 open event

The parameter format is as follows

Description of name setting Meaning

Exit open required. Open control app communication event request.

Obj required.

Flash default

Word follow-up support

Excel follow-up support

CAD follow up support

par0

#### 3.3.3.1 "AppType":4 open flash

```
{"emit":"open","Obj":"flash","AppType":4,"src":" http://img1.yo4399.com/swf/00/0ff035e0e96584c07df65ab3636f72.swf ","pos":1,"par0":{"autoPlay":1,"toolbar":0,"rightMenu":0,"hitCaption":0,"hideStop":0,"loop":1,"volumeMute":0,"flashVars":"a=0&b=0&c=SetInSrc"}}
```

Description of name setting Meaning

Exit open required. Open control app communication event request.

Obj flash required.

Flash default

Word follow-up support

Excel follow-up support

CAD follow up support

Apptype 0 is required.

0 ActiveX

1 web

2 Web flash file

3. When the web media file is set to 0, how to open it without ActiveX default usage 2 installed locally

SRC required.

When apptype is 0, local files are supported, which can be relative or absolute paths.

The position of the app window of the POS control is required.

1 the location identified by the code is used by default.

Par0 autoplay is optional.

0 does not play automatically

1 autoplay, default

Toolbar optional.

0 has no control bar, default

1 with control strip

Rightmenu is optional.

Zero

Hitcaption is optional.

0 left click mouse can't drag, default

1 left click to drag

Hidestop optional.

0 don't stop playing when hidden, default

1 stop playing when hidden

Loop is optional.

0 does not cycle automatically,

1 loop, default

Volumemute is optional.

0 no mute, default

1 mute

Flashvars is optional. Can be set in SRC

POS {"left": 372, "top": 203, "width": 606, "height": 406} required.

1 by default, the location recognized by the code is used. For different browsers, the location of automatic identification needs to be optimized


#### 3.3.3.2 "apptype": 1 open flash

```
{"emit":"open","Obj":"flash","AppType":1,"src":" http://sxiao.4399.com/4399swf/upload_ swf/ftp14/yzg/20140328/bombit7/zx_ game7.htm","pos":1}
```

Description of name setting Meaning

Exit open required. Open control app communication event request.

Obj flash required.

Apptype 1 is required.

0 ActiveX

1 web

2 Web flash file

3. When the web media file is set to 0, how to open it without ActiveX default usage 2 installed locally

SRC required.

When apptype is 0, local files are supported, which can be relative or absolute paths.

POS {"left": 372, "top": 203, "width": 606, "height": 406} required.

1 by default, the location recognized by the code is used. For different browsers, the location of automatic identification needs to be optimized

#### 3.3.3.3 "apptype": 2 open flash

```
{"emit":"open","Obj":"flash","AppType":2,"src":" http://sxiao.4399.com/4399swf/upload_ swf/ftp18/liuxy/20160130/17801/ game.swf ","pos":1,"par0":{"autoPlay":true,"loop":true,"quality":"high","wmode":"Transparent"}}
```

Description of name setting Meaning

Exit open required. Open control app communication event request.

Obj flash required.

Apptype 3 is required.

0 ActiveX

1 web

2 Web flash file

3. When the web media file is set to 0, how to open it without ActiveX default usage 2 installed locally

SRC required.

When apptype is 0, local files are supported, which can be relative or absolute paths.

POS {"left": 372, "top": 203, "width": 606, "height": 406} required.

1 by default, the location recognized by the code is used. For different browsers, the location of automatic identification needs to be optimized

Par0 autoplay is optional. Default true refers to the official flash default parameter.

Loop is optional. Default true refers to the official flash default parameter.

Quality is optional. Default high refers to the official flash default parameter.

Wmode is optional. Default transparent refers to the official flash default parameters.

#### 3.3.3.4 "apptype": 3 open flash

```
{"emit":"open","Obj":"flash","AppType":3,"src":" https://media.html5media.info/video.mp4 ","pos":1,"par0":{"autoPlay":1,"loop":1}}
```

Description of name setting Meaning

Exit open required. Open control app communication event request.

Obj flash required.

Apptype 3 is required.

0 ActiveX

1 web

2 Web flash file

3. When the web media file is set to 0, how to open it without ActiveX default usage 2 installed locally

SRC required.

When apptype is 0, local files are supported, which can be relative or absolute paths.

POS {"left": 372, "top": 203, "width": 606, "height": 406} required.

1 by default, the location recognized by the code is used. For different browsers, the location of automatic identification needs to be optimized

Par0 autoplay is optional. Default 1 reference

https://player.alicdn.com/aliplayer/setting/setting.html

Loop is optional. Default 1

3.3.3.5
{"emit":"open","Obj":"web","AppType":1,"pos":1,"par":{"htmlStr":null,"HttpServer_startUrl":null,"URL":"http://www.appemit.com"},"par0":{"header":null,"noScriptErr":true,"UIFLAG":null,"DLCTL":null,"userAgent":null,"crossDomain":true}}

Representation, description
It is necessary to open
Obj web required.
AppType 1
No.1
2 WebKit 2 download
POS {left]:
1. Language requirements
yes
(adverbial infinitive)
htmlStr-Html
Httpserver \ u starturl task executor
URL http://www.appemit.com/ Donors
/demo/html demo/html.html  
 (more info please refer to the latest PDF file description in the download documents. )

#### 3.3.3.6 WebKit kernel opens Web page

{"emit":"open","Obj":"web","AppType":2,"pos":1,"par":{"htmlStr":null,"HttpServer_ startUrl":null,"URL":" http://www.appemit.com "},"par0":{"header":null, "userAgent":null,"crossDomain":true}}
Description of name setting Meaning
Exit open required. Open web event request.
Obj web required.
Apptype 2 is required.
1 IE kernel
2 WebKit kernel
POS {"left": 372, "top": 203, "width": 606, "height": 406} required.
1 by default, the location recognized by the code is used.
For different browsers, the location of automatic identification needs to be optimized
Par required. Priority descending in sequence: one of the three parameters must not be empty.
Htmlstr HTML code
HttpServer_ Starturl opens the local HTML file path as a server, which can be absolute or relative. /Is the separator.
URL	 http://www.appemit.com  perhaps
/demo/html Demo/ html.html	 Support web address or local HTML file path.
Par0 optional.
Header
Useragent agent
Crossdomain bool default true
Ture
false

####3.3.3.7 blink kernel opens
 "{ emit"："open","Obj"："web","AppType"：3,"pos"：1,"par"：{"htmlStr"：null,"HttpServer_startUrl"：null,"URL"："http://www.appemit.com "}," par0"：{"header"：null,"userAgent"：null,"crossDomain"：true}}"

 Name setting meaning description
 emit open necessary. open web page event request.
 Obj web necessary.
 AppType 3 necessary.
 1IE kernel
 2 webkit Kernel
 3 blink If the kernel is negative-3, it is a floating window
 pos {"left"：372,"top"：203,"width"：606,"height"：406} necessary.
 1 By default, use code to automatically identify locations.
 For different browsers, the location of automatic recognition needs to be optimized
 par necessary. the priority level drops in turn three parameters must have one not empty.
 htmlStr Html code
 HttpServer_startUrl open html local file path as a server, it can be absolute or relative. / is a separator.
 URL http://www.appemit.com or
 / demo/htmlDemo/html.html supports web addresses or local html file paths. 
 Par0 optional.
 header head
 userAgent agent
 crossDomain bool default true
 Ture
 false
 
### 3.3.4 close

#### 3.3.4.1 close the app corresponding to Sid
`{"emit":"close","Obj":"flash"}`
Description of name setting Meaning
Exit close required. Close the control app communication event request.
Obj flash required.

#### 3.3.4.2 close all app of CID

`{"emit":"closeAll","Obj":"flash"}`
Description of name setting Meaning
Exit close required. Close all control app communication event requests. Close all control apps running under CID
Obj flash required.

## 3.4 obtaining parameters

{"emit":"getPar","Obj":"clientAuth"}
Description of name setting Meaning
Emit getPar is required. Get parameter request.
Whether obj clientauth is authorized
1 authorization
0 none

## 3.5 setting parameters

{"emit":"setPar","Obj":"flash","topMost":true}
Description of name setting Meaning
Emit getpar required. Get parameter request.
Obj flash required.
Topmost is required.
True top
False cancel top

## 3.6 appemit operation

### 3.6.1 error message

{"emit":" lasterr "}
Description of name setting Meaning
Emit laster is required. Get the most recent error request. "

### 3.6.2 restart

{"emit":"restart","Obj":"AppEmit"}
Description of name setting Meaning
Exit restart required. Appemit restart request. The client needs to be reconnected after restart.
Obj appemit required.

### 3.6.3 update

{"emit":"update","Obj":"AppEmit"}
Description of name setting Meaning
Emit update required. Ask appemit whether to update the program request. Forced update by default. If config.ini If AutoUpdate = 0 is set in it, you will be asked to update.
Obj appemit required.

### 3.6.4 about

{"emit":"about","Obj":"AppEmit"}
Description of name setting Meaning
Emit about is required. Get about the request. Back
{"data":{"appName":"AppEmit","url":" http://www.appemit.com/ ","verDesc":"\u516C\u5171\u514D\u8D39\u7248(Public free Version)","verType":0,"version":"0.3.5"}," }
Obj appemit required.

### 3.6.5 version information

{"emit":"version","Obj":"AppEmit"}
Description of name setting Meaning
Emit version required. Get version request. 	{"data":{"verDesc":"\u516C\u5171\u514D\u8D39\u7248(Public free Version)","verType":0,"version":"0.3.5"},"
Obj appemit required.

# 4. Questions

1. Support linux mac?

Current versions are not supported and are used on windows systems.

2. What are the restrictions for the free version?

There are pop-up windows every 80 times a message is sent.

There are no limits on fee versions, there are Enterprise and VIP Enterprise editions, including support for local area networks.

3. Test click connection, why not respond? 

The first step is to open the AppEmit.exe service, you can F12 to see the error report. After restarting the system, the AppEmit.exe process is automatically turned on and not shut down.

4. How do I develop plug-ins?

Use the C interface of HPSocket. Currently in testing.
