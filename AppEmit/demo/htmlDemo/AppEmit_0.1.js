 
	//$(function () { window.οnlοad=	 function () {
        var ws, isWin,Obj_App="flash" ;
        var rid=0;   //request id    
		var AppOpenMark=null;
 
            var datetime = new Date();
            var tiemstr = datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds() + '.' + datetime.getMilliseconds();
 
 
         ///////main proc//////////////////
		 
		 initAppEmit=function(wsUrl){

				if  (!wsUrl) { console.log("No  websocket  Url");return}

				 try{
					 //ws://localhost:80/appemit?cid=10000-0&sid=1&flag=1
						ws = new WebSocket(wsUrl);  
						// 打开Socket 
						ws.onopen = function (evt) {
							// 发送一个初始化消息 
							// 混淆加密本js文件，不要公开 cid 和clientKey
 
						  //sid  gid 在调试时也可以在wsUrl的参数里面设置
						  // 发布后统一设置在此
							 var init_AE={
 									 "clientKey":"temp-0000000000",  
									  "Browser":ThisBrowser,
									  "wsUrl":wsUrl,
									//  "sid":"123456",         // 用户session 或者用户名ID，唯一可以准确通话  
									  "gid":"[1,2]",            //用户群ID，一个用户可以加入多个群
                                     // "flag":0,
							  }

							  EmitReq_PaOP(init_AE);
 
						     // EmitReq_PaOP({"clientAuth":1 });  //获取授权信息
							  
						};
						// 监听消息
						ws.onmessage = function (evt) {
							var data=evt.data;
							//var blob=new Blob([data],{"type":"text/html"});   //{"type":"application/octet-binary"});  application/octet-stream
							//  	ok	    <img  id="img1" />   application/octet-binary
		 
							//var blob=new Blob([data],{"type":"application/octet-binary"}); 
						// var img1= document.getElementById("AppEmbed");  //iframe1   canvas1  img1
						  //img1.src= window.URL.createOBJectURL(blob);
						   //  if (!AppOpenMark ) data=JSON.parse(data);
						   Jdata=JSON.parse(data);
 
							  if (Jdata.AppStatus=="open"    ){
								  AppOpenMark=1;
							  }
							 console.log(Jdata)
						   AppEmbedOut= document.getElementById("AppEmbedOut") ;
                             if	(AppEmbedOut) {
								AppEmbedOut.innerHTML =data+'</br>'+AppEmbedOut.innerHTML
							 }								 
					};
						ws.onerror = function (evt) {
						  //产生异常
						}; 
						ws.onclose = function (evt) {
							AppOpenMark=null;
						};
					 
				 }catch(ex){
					 console.log(ex.message);
			    }
			 
		 }
		
 
	 startAppEmit=function (Req) {
		 
		if  (!isWin) {console.log("Not windows system!"); return ;}
		 
		 //是否启动ws
 
		 if (!ws)  {
				 initAppEmit(Req["wsUrl"]);
				 setTimeout(  EmitReq_PaOP(Req),500);
         }else{
			     if (AppOpenMark) {  EmitReq_PaOP({"emit":"close"},Obj_App);}
				 /*
				var  Req={};
				   Req["emit"]="open";
				   Req["movie"]=!!movie?movie:"D:/work/temp/m1.swf" ;
				   Req["par0"]={"autoPlay":1,"toolbar":0,"rightMenu":0};
				*/
			var pos= Req["pos"]?1:0; //add position
			 //var Obj= Req["Obj"]?Req["Obj"]:Obj_App; //add Obj
			  EmitReq_PaOP(Req,Req["Obj"],pos);	 
		 }
  
	  }
			 
   //  setTimeout (startAppEmit,2000);
			
		///////////close window////////////////
  		 window.onbeforeunload = function(e){
			//add save file 
  
           //    setTimeout("alert('尽情的弹出吧！')",1000);
		  if (AppOpenMark) {  EmitReq_PaOP({"emit":"close"},Obj_App);}
 				
		  if (ws) {ws.close();}
			/* setTimeout(function(){
					if(window.confirm('Quit OK?')){
							 alert("确定");
							 EmitReq_PaOP({"emit":"close"},Obj_App);
							 return true;
						  }else{
							 alert("取消");
							 return false;
						 }
				},500}	 
			 */
				
			};  
		
   /////////////EmitReq_PaOP//////////////////////////////////////////////////////////		
	  EmitReq_PaOP=function(Par,obj,pos){ 
 
		  var AppPar={};
		  if (Par ) AppPar=Par;
		 if (obj ) AppPar["Obj"]=obj;
	 	  if  ( pos)   { AppPar["pos"]=GetAbsoluteLocationEx(AppEmbed)["pos"];  }

	   
	       AppPar["rid"]=rid;
		  var msg =  JSON.stringify(AppPar);
		   if ( ws && ws.readyState==1 && msg) {	
		   	 rid++;
	         ws.send(msg);	
	
			}
		  // console.log( msg)
		}
		

		///////////////////浏览器/////////////////////////////

			function checkBrowser(win){
				var ua = navigator.userAgent.toLocaleLowerCase();
				var os=null;
				if (!!win){
					
					  if (ua.indexOf("win32") >= 0 || ua.indexOf("wow32") >= 0) {
						os="win32"
					 }
				   if (ua.indexOf("win64") >= 0 || ua.indexOf("wow64") >= 0) {
						os="win64"
				   }
				   return  !!os?os:false;
				}
				
				var browserType=null;
				if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
					   browserType = "IE";
					   browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
				} else if (ua.match(/firefox/) != null) {
					   browserType = "firefox";
				}else if (ua.match(/ubrowser/) != null) {
					   browserType = "UC";
				}else if (ua.match(/opera/) != null) {
					   browserType = "opera";
				} else if (ua.match(/bidubrowser/) != null) {
					   browserType = "bidubrowser";  
				}else if (ua.match(/edge/) != null) {
					   browserType = "edge";  
				}else if (ua.match(/metasr/) != null) {
					   browserType = "sogou";  
				}else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
					   browserType = "QQ";
				}else if (ua.match(/maxthon/) != null) {
					   browserType = "maxthon";
				}else if (ua.match(/chrome/) != null) {
					var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
							function _mime(option, value) {
										var mimeTypes = navigator.mimeTypes;
										for (var mt in mimeTypes) {
										if (mimeTypes[mt][option] == value) {
											   return true;
										  }
										}
										return false;
							}
					if(is360){               
					browserType = '360';  
								 }else{  
								browserType = "chrome";  
								 }  
						   
					}else if (ua.match(/safari/) != null) {
						   browserType = "safari";
					}
					return browserType;
				}
				
		 var ThisBrowser=checkBrowser();
 
	   /*
		function isIE() { 
			if (!!window.ActiveXObject || "ActiveXObject" in window)  { return true; }  else { return false; }  
		}  
		*/
	  var isIE=(ThisBrowser=="IE"?true:false);
 	   isWin=checkBrowser(1);
 
	 
		////////////////////获得body的屏幕位置	
 			//用事件取值大法
	     var MousebodyOffset=null;
	 	function getBodyOffset(){
			if(window.attachEvent)
				document.attachEvent("onmousemove",getScreenPx);
			else if(window.addEventListener)   
				document.addEventListener("mousemove",getScreenPx,false);
		}
		function getScreenPx(e){
			var e = window.event||e;
			MousebodyOffset= [e.screenX-e.clientX,e.screenY-e.clientY];

		}
 
	//   var e = e||window.event;
			//除ff
			//alert([window.screenLeft,window.screenTop]);
			//除ie  (不过op取到的值有些怪异)
			//alert([window.screenX,window.screenY]);
			//由于状态栏的不确定,导致下面方法基本是无用的
			//alert([window.outerHeight,window.innerHeight,window.outerHeight-window.innerHeight])


 
		 
		//////获得body的屏幕位置	////////////////////////////////////
			
			  //增加 菜单栏高度
			 var menuHeight=window.outerHeight-window.innerHeight;
		  if (menuHeight>120) menuHeight=103;
		  //navigator.appCodeName  navigator.appName  navigator.appVersion navigator.platform navigator.userAgent
		  
		   function GetAbsoluteLocationEx(element) {   
				if (arguments.length != 1 || element == null) {   
					return null;   
				}   
				var elmt = element;   
				var offsetTop = elmt.offsetTop;   
				var offsetLeft = elmt.offsetLeft;   
				var offsetWidth = elmt.offsetWidth;   
				var offsetHeight = elmt.offsetHeight;   
				 var screenLeft=0;var screenTop=0;
  
               if  (!MousebodyOffset)  {getBodyOffset(); }
                if  (MousebodyOffset)  {menuHeight= MousebodyOffset[1]}  //修正
		//	 if  (menuHeight>110 &&!!MousebodyOffset )  {getBodyOffset();screenLeft=MousebodyOffset[0]; screenTop=MousebodyOffset[1];  }
		//	 	else{
				 screenLeft=isIE?window.screenLeft :window.screenX;	 screenTop=isIE?window.screenTop:window.screenY+menuHeight;   
			// }
 
			   
			   
			 while (elmt = elmt.offsetParent) {   
				   // add this judge   
				   if (elmt.style.position == 'absolute' || elmt.style.position == 'relative'   || (elmt.style.overflow != 'visible' && elmt.style.overflow != '')) {   
					   break;   
				   }   
				   offsetTop += elmt.offsetTop;   
				   offsetLeft += elmt.offsetLeft;   
			   }   
			   //减去 scrolHeight
			  var PageOffset=GetPageOffset();
			   //修正
			   if (screenLeft>0 ){screenLeft+=4;screenTop+=8}
			   return { "pos":{"left": offsetLeft+screenLeft-PageOffset.x, "top": offsetTop+screenTop-PageOffset.y, "width": offsetWidth, "height": offsetHeight},"offsetLeft":offsetLeft,"offsetTop":offsetTop,"PageOffsetx":PageOffset.x,"PageOffsety":PageOffset.y};   
		   }  
	   
 
	                 //
			 var AppEmbed= document.getElementById("AppEmbed");  //iframe1   canvas1  img1
			   //AppEmbed.getBoundingClientRect()   //  document.getElementById("AppEmbed").getBoundingClientRect()
	        
 
			  //console.log(JSON.stringify(GetAbsoluteLocationEx(AppEmbed)));

		
			 function GetPageOffset(){
							 
				 var supportPageOffset = window.pageXOffset !== undefined;
				 var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
				var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
				var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
				return {"x":x,"y":y};
			 }
 
				   
			 /*
			  function getElementPos(elementId){    
				var ua = navigator.userAgent.toLowerCase();    
				var isOpera = (ua.indexOf('opera') != -1);    
				var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof    
				var el = elementId;  
				if (el.parentNode === null || el.style.display == 'none') {    
					return false;    
				}    
				var parent = null;    
				var pos = [];    
				var box;    
				if (el.getBoundingClientRect) {// IE    
					box = el.getBoundingClientRect();    
					var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);    
					var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);    
					return {    
						x: box.left + scrollLeft,    
						y: box.top + scrollTop    
					};    
				} else  if (document.getBoxObjectFor) {    
					box = document.getBoxObjectFor(el);    
					var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;    
					var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;    
					pos = [box.x - borderLeft, box.y - borderTop];    
				} else {// safari & opera        
					pos = [el.offsetLeft, el.offsetTop];    
					parent = el.offsetParent;    
					if (parent != el) {    
						while (parent) {    
							pos[0] += parent.offsetLeft;    
							pos[1] += parent.offsetTop;    
							parent = parent.offsetParent;    
						}    
					}    
					if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {    
						pos[0] -= document.body.offsetLeft;    
						pos[1] -= document.body.offsetTop;    
					}    
				}    
				if (el.parentNode) {    
					parent = el.parentNode;    
				} else {    
					parent = null;    
				}    
				while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors    
					pos[0] -= parent.scrollLeft;    
					pos[1] -= parent.scrollTop;    
					if (parent.parentNode) {    
						parent = parent.parentNode;    
					} else {    
						parent = null;    
					}    
				}    
				return {   
					x: pos[0],    
					y: pos[1]    
				};    
			} 
			var xd = getElementPos(AppEmbed);
          */
			 
 
    ////////send change window//////////////////////////
		  //document.addEventListener   window.resize
		// window.addEventListener("resize",resizeFunc); 	



		   ///////scroll   page////////////////////////
		   window.onscroll = function() {
			  //为了保证兼容性，这里取两个值，哪个有值取哪一个
			  //scrollTop就是触发滚轮事件时滚轮的高度
			      var AppPos=GetAbsoluteLocationEx(AppEmbed);
  
				  if   (AppPos.PageOffsety>AppPos.offsetTop+AppPos.pos.height/2 ){   //被卷入
					   AppHide();
				  }else {
					  
					  AppResume();
				  }
			}


        ////////resize window//////////////////////////////
		var debounce = function (func, threshold, execAsap) { 
			 var timeout; 
		   return function debounced () { 
				var Obj = this, args = arguments; 
				function delayed () { 
					if (!execAsap) 
						func.apply(Obj, args); 
						timeout = null; 
					}; 
				if (timeout) 
				clearTimeout(timeout); 
				else if (execAsap) 
					func.apply(Obj, args); 
					timeout = setTimeout(delayed, threshold || 100); 
				}; 
		} 
		// 说明代码不是我写的。 
		// 代码说明: 
		//debounce 接受 3 个参数，后两个可选；第一个是要 debounce 的函数， 第二个代表 debouce 的时间间隔，第三个在时间段的开始还是结束执行函数; 
		//debounce 返回包装好的函数，该函数两次执行间隔至少是 threshold，并且小于 threshold 间隔的调用会重新开始计时( 两次调用的时间间隔); 
		//把 clearTimeout( timeout ) 换为 timer = null; 返回函数两次执行间隔至少是 threshold，并且小于 threshold 间隔的调用会重新开始计时( 两次调用的时间间隔); 
		// 解决 onresize 多次调用 

		//window.onresize =  function(){f (ws)  {debounce( EmitReq_PaOP({"emit":"move"},Obj_App,1), 1000, true) }}
 
	 	window.onresize = function(){
		     if (AppOpenMark ) EmitReq_PaOP({"emit":"move"},Obj_App,1);
		}
		
		/////////move window///////////////////////////////////////////////////


		funcMouseout=function(evt){ 
				  if (evt.toElement === null && evt.relatedTarget === null) {
					//if outside the window...
					//if (console) console.log("out");
					interval = setInterval(function () {
					  //do something with evt.screenX/evt.screenY
						 if(oldX != window.screenX || oldY != window.screenY){
							 //   if (console) 	console.log('moved!');
							   if (AppOpenMark ) 	EmitReq_PaOP({"emit":"move"},Obj_App,1);
						  }  

						oldX =  isIE?window.screenLeft:window.screenX;
						oldY =  isIE?window.screenTop:window.screenY;
					 
					  
					}, 800);
				  } else {
					//if inside the window...
					  //  if (console) console.log("in");
					clearInterval(interval);
				  }
				}
			 var oldX = isIE?window.screenLeft:window.screenX, oldY =isIE?window.screenTop:window.screenY;
			 var interval;
			if(window.attachEvent)
					window.attachEvent("onmouseout",funcMouseout);
			else if(window.addEventListener)   
					window.addEventListener("mouseout",funcMouseout,false);
			
			

		///////////hide window////////////////
		AppHide=function(){
			  var  addPar={};
		    addPar["emit"]="hide";
		   //hideStop  隐藏后台不播放1，可以不设置默认播放0
		   if (AppOpenMark ) EmitReq_PaOP(addPar,Obj_App);
		}
		AppResume=function(){
			   var  addPar={};
			  addPar["emit"]="show";
	 
			  if (AppOpenMark) EmitReq_PaOP(addPar,Obj_App,1);
			
			
		}
		funcVisibilitychange =function(){
			 if (document.visibilityState!=='visible' ){    //document.hidden==true
				  AppHide();
 
			 }else{
				AppResume();
			 }
		  }
		  
		 function getHiddenProp(){
			var prefixes = ['webkit','moz','ms','o'];
			// 如果hidden 属性是原生支持的，我们就直接返回
			if ('hidden' in document) {
			  return 'hidden';
			}
			
			// 其他的情况就循环现有的浏览器前缀，拼接我们所需要的属性 
			for (var i = 0; i < prefixes.length; i++){
			  // 如果当前的拼接的前缀在 document对象中存在 返回即可
			  if ((prefixes[i] + 'Hidden') in document) {
				return prefixes[i] + 'Hidden';
			  }  
			}
		
			// 其他的情况 直接返回null
			return null;
		}
	function getVisibilityState() {
				var prefixes = ['webkit', 'moz', 'ms', 'o'];

				if ('visibilityState' in document) {
				  return 'visibilityState';
				}

				for (var i = 0; i < prefixes.length; i++) {
					if ((prefixes[i] + 'VisibilityState') in document){
					  return prefixes[i] + 'VisibilityState';
					}  
				}
				// 找不到返回 null
				return null;
			}
			
		var visProp = getHiddenProp();
		if (visProp) {
			// 有些浏览器也需要对这个事件加前缀以便识别。
			//var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
  
		    if(window.attachEvent)
					window.attachEvent( visProp.replace(/[H|h]idden/, '') + 'onvisibilitychange',funcVisibilitychange);
			else if(window.addEventListener)   
					window.addEventListener( visProp.replace(/[H|h]idden/, '') + 'visibilitychange',funcVisibilitychange,false);
				
		}

	/*
	 	if (document.hidden !== "undefined") {
		 
		     if(window.attachEvent)
					window.attachEvent("onvisibilitychange",funcVisibilitychange);
			else if(window.addEventListener)   
					window.addEventListener("visibilitychange",funcVisibilitychange,false);
	 	}
		*/
 

	 
 
 /*
			 // 进入页面执行
			// 记录当前时间并转成时间戳
			const now = new Date().getTime();
			// 从缓存中获取用户上次退出的时间戳
			const leaveTime = parseInt(localStorage.getItem('leaveTime'), 10);
			// 判断是否为刷新，两次间隔在5s内判定为刷新操作
			const refresh = (now - leaveTime) <= 5000;
			// 测试alert
			alert(refresh ? '刷新' : '重新登陆');

			// 退出当前页面执行
			window.onunload = function(e){ // ios 不支持 window.onbeforeunload()
			  // 将退出时间存于localstorage中
			  localStorage.setItem('leaveTime', new Date().getTime());
			}
 */
 
 
 
