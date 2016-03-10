///<jscompress sourcefile="data.js" />
/***********************************
 * @author Robby
 * @version 1.6.4.2
 * @date 2015/04/01
 * @update 2015/06/06
 * @email libenchangedeyou@163.com
 ************************************/
if(typeof(YX)=="undefined") var YX={};
YX.Data = function()
{
	if(typeof(jQuery)=="undefinded") throw "YMAPI depended on jquery!";
	var instance=this;
	this.errorMsg="";//错误信息
	this.ajaxTimers=[];//请求超时
	this.ajaxTimeout=10000;//请求超时时间
	this.config=new YX.Data.Config(this);
	this.util=new YX.Data.Util(this);
	this.cache=new YX.Data.Cache(this);
	
	this.config.Init();
	if(!this.config.lid&&!this.config.tid)
	{
		this.errorMsg="Initialize data failed，No LID or TID!";
		throw this.errorMsg;
		return;
	}
	if(this.config.lid&&!/^\d{1,}$/.test(this.config.lid+"")){
		this.errorMsg="Initialize Data Failed，No LID!";
		throw this.errorMsg;
		return;
	}
	if(this.config.tid&&!/^\d{1,}$/.test(this.config.tid+""))
	{
		this.errorMsg="Initialize Data Failed，No TID!";
		throw this.errorMsg;
		return;
	}
	this.RD=function(url,data,callback,cKey)
	{
		if(cKey&&instance.cache.Get(cKey))
		{
			callback(instance.cache.Get(cKey),"");
			return;
		}
		if(typeof(callback)!="function") callback=function(){};
		if(!data) data={};
		if(!url)
		{
			instance.errorMsg="The url is invalid!";
			callback(null,instance.errorMsg);
			return;
		}
		if(!instance.ajaxTimers[cKey]){
			instance.ajaxTimers[cKey]=setTimeout(function(){
				clearTimeout(instance.ajaxTimers[cKey]);
				instance.ajaxTimers[cKey]=0;
				instance.errorMsg="Error,The request is timeout!";
				callback(null,instance.errorMsg);
			},instance.ajaxTimeout);
		}else{//存在表示此cKey正在请求，不予再次请求
			return;
		}
		$.ajax({
		    async:true,url: url,type: "GET",
		    dataType: 'jsonp',
		    jsonp: 'yxjn',
		    data:data,
		    timeout: instance.ajaxTimeout,
		    cKey:cKey,
		    success: function (result)
			{
				//清除超时检测
				if(instance.ajaxTimers[cKey])
				{
					clearTimeout(instance.ajaxTimers[cKey]);
					instance.ajaxTimers[cKey]=0;
				}else{
					return;//超时了，在执行视为无效
				}
				if(result){
					instance.cache.Set(cKey,result);
					callback(result,"");
				}else{
					instance.errorMsg="Data load failed!";
					callback(null,instance.errorMsg);
				}
			}
		});
		return true;
   };
   
   /*资讯相关接口*/
   this.Site=function(callback, router)
   {
   	   var dispatch = !router ? instance.config.siteRouter : router;
	   instance.RD(instance.config.siteUrl + dispatch,{"tid":instance.config.tid,"lid":instance.config.lid},callback,"site_"+instance.config.lid+"_"+instance.config.tid);
   };
   this.Map=function(sid,callback, router)
   {
	   if(sid)instance.config.sid=sid;
	   if(!/^\d{1,}$/.test(instance.config.sid+"")){
		   instance.errorMsg="Load Map's Data Failed，No SID!";
			throw instance.errorMsg;
	   }
	   var dispatch = !router ? instance.config.mapRouter : router;
	   instance.RD(instance.config.mapUrl + dispatch,{"sid":instance.config.sid},callback,"map_"+instance.config.sid);
   };
   this.Hot=function(sid,callback, router)
   {
	   if(!sid)sid=instance.config.sid;
	   var dispatch = !router ? instance.config.hotRouter : router;
	   instance.RD(instance.config.hotUrl + dispatch,{"sid":sid},callback,"Hot_"+sid);
   };
   this.List=function(mid,callback,pno,pco,sid, router)
   {
	   if(!pno) pno="";
	   if(!pco) pco="";
	   if(!sid)sid=instance.config.sid;
	   var dispatch = !router ? instance.config.listRouter : router;
	   instance.RD(instance.config.listUrl + dispatch,{"sid":sid,"mid":mid,"pno":pno,"pco":pco},callback,"list_"+sid+"_"+mid+"_"+pno+"_"+pco);
   };
   this.Art=function(aid,callback, router)
   {
   	   var dispatch = !router ? instance.config.artRouter : router;
	   instance.RD(instance.config.artUrl + dispatch,{"aid":aid},callback,"art_"+aid);
   };
   this.Cate=function(lid,tid,callback, router)
   {
	  if(!lid)lid=instance.config.lid;
	  if(!tid)tid=instance.config.tid;
	  var dispatch = !router ? instance.config.cateRouter : router;
	  instance.RD(instance.config.cateUrl + dispatch,{"lid":lid,"tid":tid},callback,"cate_"+lid+"_"+tid);
  };
  this.More=function(cid,callback,pno,pco,sid, router)
  {
	  if(!pno) pno="";
	  if(!pco) pco="";
	  if(!sid)sid=instance.config.sid;
	  var dispatch = !router ? instance.config.moreRouter : router;
	  instance.RD(instance.config.moreUrl + dispatch,{"sid":sid,"cid":cid,"pno":pno,"pco":pco},callback,"more_"+sid+"_"+cid+"_"+pno+"_"+pco);
  };
  this.SetTimeout=function(t)
  {
	   if(!t) return;
	   t=t+"";
	   if(!/^\d{1,}$/,test(t+"")) return;
	   t=parseInt(t);
	   instance.ajaxTimeout=t;
   };
   this.StopAllRequest=function()
   {
	   for(var k in this.ajaxTimers)
	   {
		   clearTimeout(instance.ajaxTimers[k]);
		   instance.ajaxTimers[k]=0;
	   }
	   instance.ajaxTimers=[];
   };
   
};
///<jscompress sourcefile="config.js" />
YX.Data.Config = function(module)
{
	var instance =this;
	this.serverPath = "";
	this.siteUrl="";
	this.siteRouter = "";
	this.mapUrl="";
	this.mapRouter = "";
	this.hotUrl="";
	this.hotRouter = "";
	this.listUrl="";
	this.listRouter = "";
	this.artUrl="";
	this.artRouter = "";
	this.cateUrl="";
	this.cateRouter = "";
	this.moreUrl="";
	this.moreRouter = "";
	this.sid="";
	this.lid="";
	this,tid="";
	this.HttpPath = function(path)
	{
		return instance.GetDomain()+instance.serverPath+path;
	};
	this.GetDomain=function()
	{
		return document.location.href.split(instance.serverPath)[0];
	};
	this.Init=function()
	{
		var paths = location.pathname.split("/");
		var lasPath = paths.length<3?"":paths[paths.length-2];
		instance.serverPath=lasPath+"/";
		instance.siteUrl = $("#yx_siteurl").length>0?$("#yx_siteurl").get(0).href:"";
		instance.siteRouter = $("#yx_siteurl").length>0?$("#yx_siteurl").get(0).getAttribute('router'):"";
		instance.mapUrl = $("#yx_mapurl").length>0?$("#yx_mapurl").get(0).href:"";
		instance.mapRouter = $("#yx_mapurl").length>0?$("#yx_mapurl").get(0).getAttribute('router'):"";
		instance.hotUrl = $("#yx_hoturl").length>0?$("#yx_hoturl").get(0).href:"";
		instance.hotRouter = $("#yx_hoturl").length>0?$("#yx_hoturl").get(0).getAttribute('router'):"";
		instance.listUrl = $("#yx_listurl").length>0?$("#yx_listurl").get(0).href:"";
		instance.listRouter = $("#yx_listurl").length>0?$("#yx_listurl").get(0).getAttribute('router'):"";
		instance.cateUrl = $("#yx_cateurl").length>0?$("#yx_cateurl").get(0).href:"";
		instance.cateRouter = $("#yx_cateurl").length>0?$("#yx_cateurl").get(0).getAttribute('router'):"";
		instance.moreUrl = $("#yx_moreurl").length>0?$("#yx_moreurl").get(0).href:"";
		instance.moreRouter = $("#yx_moreurl").length>0?$("#yx_moreurl").get(0).getAttribute('router'):"";
		instance.artUrl = $("#yx_arturl").length>0?$("#yx_arturl").get(0).href:"";
		instance.artRouter = $("#yx_arturl").length>0?$("#yx_arturl").get(0).getAttribute('router'):"";
		instance.sid=$("#yx_sid").length>0?$("#yx_sid").text():"";
		instance.tid=$("#yx_tid").length>0?$("#yx_tid").text():"";
		instance.lid=$("#yx_lid").length>0?$("#yx_lid").text():"";
		
		
	};
};

///<jscompress sourcefile="cache.js" />
YX.Data.Cache=function(module)
{
	var instance=this;
	this.IsCache=false;
	this.Clear=function()
	{
		instance.Memory.Clear();
		instance.Local.Clear();
	};
	this.Get=function(key)
	{
		if(!instance.IsCache) return null;
		var data =instance.Local.Get(key);
		return data?data:instance.Memory.Get(key);
	};
	this.Set=function(key,val)
	{
		if(!instance.IsCache) return;
		instance.Memory.Set(key, val);
		instance.Local.Set(key, val);
	};
	this.Memory=
	{
		cache:{},
		Set:function(key,data)
		{
			this.cache[key]=data;
		},
		Get:function(key)
		{
			return this.cache[key]?this.cache[key]:null;
		},
		Clear:function()
		{
			this.cache={};
		}
	};
	this.Local=
	{
		Get:function(key)
		{
			var val= window.localStorage&&window.localStorage.getItem(key)?window.localStorage.getItem(key):null;
			if(val&&window.JSON){
				try{val=JSON.parse(val);}catch(e){}
			}
			return val;
		},
		Set:function(key,val)
		{
			if(window.JSON&&typeof(val)=="object") val=JSON.stringify(val);
			if(window.localStorage) window.localStorage.setItem(key,val);
		},
		Clear:function()
		{
			if(window.localStorage) window.localStorage.clear();
		}
		
	};
};
///<jscompress sourcefile="util.js" />
YX.Data.Util=function(module)
{
	var instance=this;
	this.DecodeUrl = function(str)
	{
		if(!str) return "";
		return unescape(str);
	};
	this.EncodeUrl=function(str)
	{
		return str?escape(str):"";
	};
	this.Serialize=function(obj)
	{
	    switch(obj.constructor){  
	        case Object:
	            var str = "{";
	            for(var o in obj){str += o + ":" + this.Serialize(obj[o]) +",";}  
	            if(str.substr(str.length-1) == ",")str = str.substr(0,str.length -1);  
	            return str + "}";  
	            break;  
	        case Array:              
	            var str = "[";  
	            for(var o in obj){str += this.Serialize(obj[o]) +",";}  
	            if(str.substr(str.length-1) == ",") str = str.substr(0,str.length -1);
	            return str + "]";break;
	        case Boolean:return "\"" + obj.toString() + "\"";break;  
	        case Date:return "\"" + obj.toString() + "\"";break;
	        case Function:break;
	        case Number:return "\"" + obj.toString() + "\"";break; 
	        case String:return "\"" + obj.toString() + "\"";break;      
	    }  
	};
};
