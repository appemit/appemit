AppEmit  v1.0.5

#  Overview  [中文](https://github.com/appemit/appemit/blob/master/README_zh.md)

Appemit is a lightweight middleware that can be easily extended to communicate  applications (especially browsers) with local programs. The web socket of HTML5 standard is mainly used for calling. The default is asynchronous, and the parameters are transferred in JSON format.

### main features:

 - 1  Play web pages or Flash files containing flash in almost any browser, including swf interactive animations, flv movies, etc.
 - 2  Open and manipulate local files in the browser, such as reading PDFs, create, read, edit Office files, and support JavaScript code operations.
 - 3  Call third-party DLLs, OCX components, as well as system winApi functions, tcc, python, lua, etc. in the browser.
 - 4  Develop a package plug-in for the local hardware DLL driver module to operate and control local card readers, printers, scanners, high-shooting instruments, U shields and other hardware devices in the web page.
 - 5  Communication between applications, such as chat.
 - 6  Embedding the IE kernel web page in Chrome protects the source code, allows you to keep the original ActiveX reading html from being modified, while supporting open source kernelwke and blink.

### Solve the problem with the problem

1) Chrome browsers with an international market share of more than 68% (data source Netmarketshare; more than 25% domestic) will no longer support flash (NPAPI) after December 2020, while Microsoft's edge does not support ActiveX.

2) Customers are used to using browsers to handle a variety of business, can call the IE kernel.

3) Gamers, banks, hospitals, power, hardware, and other enterprise customers using dll, ActiveX, flash and other files need to be required.

Program Name AppEmit.exe

site	[http://www.appemit.com](http://www.appemit.com)

Github[https://github.com/appemit/appemit](https://github.com/appemit/appemit)

Email appemit (at) appemit.com	

[github download address](https://raw.githubusercontent.com/appemit/appemit/master/dist/AppEmit.zip)

[Domestic use of content distribution download address, updates have lag](https://cdn.jsdelivr.net/gh/appemit/appemit@master/dist/AppEmit.zip)

### Directory Description of Github

~~~
 ├ dist                 Download the zip package of this folder. Npswf and help document demo are included
 ├ README.md 
 └ README_zh.md
~~~

### Details of the features
- Supports synchronous, asynchronous (default) processing of messages or message groups.
- Supports opening multiple APPS on one page.
- Supports access to local and network files.
- Supports access to hardware information, including systems, CPUs, motherboards, graphics cards, memory, hard drives, networks, and more.
- Support for USB monitoring.
- Supports pcomm serial asynchronous multithreaded calls.
- Supports communication between users and sending and receiving messages.
- Supports the use of IE, webkit, blink kernel open, interactive web pages.
- Supports open, interactive flash, including ActiveX flash and NPflash.
- Multimedia playback is supported.
- Supports opening, editing, code interaction microsoft office, Jinshan Office's world, excel, ppt, and local and web document processing.
- Support for turning on PDFs.
- Supports calling third-party dll, com, etc. link libraries.
- Support for development dll, etc.

### Conditions of use

Windows system, support XP above.
 
### Technology Dependency

- Web Socket uses open source controls [HPSocket](https://github.com/ldcsaa/HP-Socket) to support ssl.
 - The Dll file opens the C interface, where the basic secondary development control is possible.
 - HPSocket4C_U.dll HPSocket4C-SSL_U.dll
- IE kernel calls flash Active control
- Non-IE kernel calls flash NPAPI control
- Webkit kernel with open source software wke control
- The blink kernel uses open source software miniblink controls

##  Getting Started
 
1. Download the AppEmit file compression package (under **/dist** dir，without plug-ins less than 6M) and run AppEmit.exe once. Set boot boot, avoid killing poison software off. Only one AppEmit.exe process can be turned on at the same time.
2. Web page registration gets set cid, clientKey, to obtain permission to connect. Open the html file inside the demo folder or the demo connection on the home page or test with the temporary account cid.
3. In-background initialization of Appemit connection service
    `AE_initAppWs("ws://localhost:80/appemit?cid=00000-1&sid=1&flag=1")`
4. Set up clientKey authorization, (clientKey is private, after publication needs to be confidentially confused encryption js) initialization data and authorization, etc.

```
var AE_initSet = {
				"emit":"init",
				  "clientKey": "temp-0000000000",   //
				"clientInfo":clientInfo,
                "wsUrl": wsUrl,
				  // "flag":0,
                //  "sid":"123456",         // 用户session 或者用户名ID，唯一可以准确通话  
                "gid": "[1,2]",  //用户群ID，一个用户可以加入多个群
              // "utf_escape":false,            //默认false, 反馈的data编码转义
			 
            };
  AE_EmitReq_PIP(AE_initSet);
  ```
5 Send a command

`AE_OpenApp('{"emit":"hardWare","Obj":"pc","par0":{"dev":["os","base"]}}')  `

6 Turn off command, automatically turn off if app is turned on

`{"emit":"close","AppId":1}  `

Smh.com.au
Under demo is mainly an example of html,
Including getting pc information to implement the call index.html
As well as playing flash appEmbed.html
Or test online
[AppEmbed App](http://www.appemit.com/demo/AppEmbed.html)

[Demo](http://www.appemit.com/demo/index.html)

- Embed IE
![嵌入IE](https://cdn.jsdelivr.net/gh/appemit/AppEmitWeb/docs/img/3_appemit_IE.gif)

- Embedflash swf
 ![image](https://cdn.jsdelivr.net/gh/appemit/AppEmitWeb@master/docs/img/1_appemit_ActiveX.gif)
 
 - Embedoffice word, JavaScript code control
  ![image](https://cdn.jsdelivr.net/gh/appemit/AppEmitWeb@master/docs/img/5_office_word_js.gif)
 
 
 
##  Contact

Email: appemit (at) appemit.com
 
##  FAQ

1. Support linux mac?

Current versions are not supported and are used on windows systems.

2. What are the restrictions for the free version?

Free version, no feature limit, but every 80 messages sent with pop-up windows.

There are no restrictions on fee versions, there are Enterprise and VIP Enterprise editions, including support for local area networks.

3. Test click connection, why not respond? 

The first step is to open the AppEmit.exe service, you can F12 to see the error report. After restarting the system, the AppEmit.exe process is automatically turned on and not shut down.

4. How do I develop plug-ins?

Use the C interface of HPSocket. Currently in testing.

