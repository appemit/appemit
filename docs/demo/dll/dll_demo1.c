	#include <windows.h>
   // #include <string.h> 
 	#include "cJSON.h"   ////需要下载开源库cJSON
 	#include "cJSON.c"
 	
	// 开发可以互动信息的动态链接库 Dll
	// http://www.appemit.com
	////生成DLL 必须使用最新版tcc扩展库才能支持UTF8,UTF16字符串
	/*
	入口函数,该函数可以有也可以没有。
	
	入口函数会自动加锁以保证线性调用,要避免在DllMain内调用下列函数:
	1、调用LoadLibrary或其他可能加载DLL的API函数( CreateProcess等 )
	2、可能再次触发DllMain的函数,例如 CreateThread,ExitThread
	3、GetModuleFileName, GetModuleHandle 等其他可能触发系统锁的API函数
	总之在DllMain最好不要调用API函数.
	*/
	
	/*
	 主要是5个函数接口,App开头的函数和变量名称不要改变
	 AppDll_init    dll初始化，用户输入参数 认证
	 AppDll_loaded  dll启动后执行
	 AppDll_destroy   dll 退出前执行
	 AppDll_RevMsg    互动时 接收   消息
	 AppDll_SendMsg    互动时  反馈 消息
	*/
	char *mycid ="00000-1";  //申请的公司产品cid ，需要修改
	char *clsId="50FCF891-1B93-4AE5-8A66-AB26A3C03378";  // pid>=guid=clsId 可使用GUID工具自行生成
	int dllThid;        //本进程ID
	// sid;            //websocket里面设置的,一般为用户ID或者sessionID，唯一
	//  rid ;        //第rid次调用
	int AppAuth=0;	  //	
      
	
	//测试
	char* joinStr(char *s1, char *s2, char *s3)
	{
    	char *result = malloc(strlen(s1)+strlen(s2)+strlen(s3)+1);//+1 for the zero-terminator
    	if (result == NULL) exit (1);
    	strcpy(result, s1);
    	strcat(result, s2);
    	strcat(result, s3);
    	return result;
	}
   
	int __stdcall DllMain(void * hinstDLL, unsigned long fdwReason, void * lpvReserved) {
	
		if (fdwReason == 1/*DLL_PROCESS_ATTACH*/ ){ 
			
		}
		return 1;
	}
	//__declspec(dllexport) 声明导出函数 
	__declspec(dllexport) int AppDll_RevMsg(HWND hwnd, char *ids,char *msg) 
	{     
 
     AppDll_SendMsg(hwnd,ids,msg);
		return 0;
 
	}
 	__declspec(dllexport) int AppDll_SendMsg(HWND hwnd, char *ids,char *msg) 
	{     
       //检查是否有	clsId	
       cJSON * ids_json= cJSON_Parse(ids);
        if (!ids_json) {ids_json=cJSON_CreateObject();} 
        if (!cJSON_GetObjectItem(ids_json,"clsId")) {
            cJSON_AddStringToObject(ids_json, "clsId",  clsId);   //必需字段 
         }
       ids=cJSON_PrintUnformatted(ids_json);
       cJSON_Delete(ids_json);
       
		struct {char * ids;char * msg; } callBackMsg = { 
			.ids=ids,             
			.msg =msg,                   //  只会反馈msg里面data字段到websocket
            
		};
 
      	SendMessage(
			hwnd,0xACCE , 
			"AppOnMsg({string ids;string msg;})", //要调用的窗体函数名( 结构体原型声明 ); 结构体原型声明应使用API语法
			&callBackMsg //将前面定义的结构体作为调用参数
		);

		return 0;
	
	 	/*
		0xACCE=_WM_THREAD_CALLBACK 使所有回调安全的转发到UI线程。
		_WM_THREAD_CALLBACK 可以跨线程跨语言并且不需要创建回调线程,适用任何普通winform对象。
		

    	*/
	}
	__declspec(dllexport) int AppDll_init(HWND hwnd, char *ids,char *msg) 
	{     
      //判断获得AppEmit提供ids(格式json)里面cid sid pid AuthKey等数据
      //和websocket的自行web提供的Json里面的data，判断验证来源是否正确
       // ids  ="{\"cid\":\"00000-1\",\"sid\":\"f1s\",\"rid\":2333,\"AuthKey\":\"000\",\"clsId\":\"50FCF891-1B93-4AE5-8A66-AB26A3C03378\"}";
  
       //具体数据和判断需要修改
        cJSON * ids_json= cJSON_Parse(ids);
       // char * ids3= cJSON_PrintUnformatted(ids_json);   //如果解析报错尝试使用cJSON
        // cJSON *  ids_json2= cJSON_Parse(ids3);

         if (!cJSON_GetObjectItem(ids_json,"clsId") || !cJSON_GetObjectItem(ids_json,"cid") || !cJSON_GetObjectItem(ids_json,"AuthKey")) { cJSON_Delete(ids_json);return -1;} 

        dllThid = GetCurrentThreadId();
        cJSON_AddNumberToObject(ids_json, "dllThid",  dllThid);  //必需
        cJSON_AddStringToObject(ids_json, "more",  NULL);   //备用字段
       //必须反馈验证
          if (strcmp(cJSON_GetObjectItem(ids_json,"cid")->valuestring,mycid)==0 && strcmp(cJSON_GetObjectItem(ids_json,"AuthKey")->valuestring,"000")==0 && strcmp(cJSON_GetObjectItem(ids_json,"clsId")->valuestring,clsId)==0) {
 
           //msg若反馈必须有  \"clsId\" \"AppAuth\"。AppAuth为1 clsId一致 才继续 // 支持\" 或者 ' 
        	 
        	 msg =  joinStr("{\"data\":{\"code\":200,\"cid\":\"00000-1\",\"sid\":\"123\",\"rid\":-1,\"rec\":",msg,",\"AppStep\":\"init\"}}");
      	    cJSON_AddNumberToObject(ids_json, "AppAuth",  1);
      	     
      	    char *ids2=cJSON_PrintUnformatted(ids_json);
         	//必须反馈验证
 
        	AppDll_SendMsg(hwnd,ids2,msg);
           	
        }else{
            cJSON_AddNumberToObject(ids_json, "AppAuth",  0);
      	    char *ids2=cJSON_PrintUnformatted(ids_json);
         	// 反馈验证
        	AppDll_SendMsg(hwnd,ids2,NULL); 
       }
 
 
        cJSON_Delete(ids_json);

		return 0;
	}
	__declspec(dllexport) int AppDll_loaded(HWND hwnd, char *ids,char *msg) 
	{     
      //处理业务 //msg若反馈必须有   data  
       //  msg =  joinStr("{\"data\":{\"code\":200,\"cid\":\"00000-1\",\"sid\":\"123\",\"rid\":-1,\"rec\":",msg,",\"AppStep\":\"loaded\"}}");
        
        //若反馈则 
         AppDll_SendMsg(hwnd,ids,msg); //如果msg中没有data，则不反馈到浏览器中
 
		return 0;
	}
	__declspec(dllexport) int AppDll_destroy(HWND hwnd, char *ids,char *msg) 
	{     
      //处理业务msg若反馈必须有data  
         //msg =  joinStr("{\"data\":{\"code\":200,\"cid\":\"00000-1\",\"sid\":\"123\",\"rid\":-1,\"rec\":",msg,",\"AppStep\":\"destroy\"}}");
      
       //若反馈则 
        AppDll_SendMsg(hwnd,ids,msg);
 
		return 0;
	}
 	//测试
	__declspec(dllexport) int Add(int a, int b ) 
	{     
		return a+b;
	}  