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
					instance.ajaxTimers[this.cKey]=0;
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
			},
			error: function(xhr, type){
                      alert('Ajax error!')
                    }
		});
		return true;
   };

   function callthis()
   {alert('22');};
   
   /*资讯相关接口*/
   this.Site=function(callback)
   {
	   instance.RD(instance.config.siteUrl,{"tid":instance.config.tid,"lid":instance.config.lid},callback,"site_"+instance.config.lid+"_"+instance.config.tid);
   };
   this.Map=function(sid,callback)
   {
	   if(sid)instance.config.sid=sid;
	   if(!/^\d{1,}$/.test(instance.config.sid+"")){
		   instance.errorMsg="Load Map's Data Failed，No SID!";
			throw instance.errorMsg;
	   }
	   instance.RD(instance.config.mapUrl,{"sid":instance.config.sid},callback,"map_"+instance.config.sid);
   };
   this.Hot=function(sid,callback)
   {
	   if(!sid)sid=instance.config.sid;
	   instance.RD(instance.config.hotUrl,{"sid":sid},callback,"Hot_"+sid);
   };
   this.List=function(mid,callback,pno,pco,sid)
   {
	   if(!pno) pno="";
	   if(!pco) pco="";
	   if(!sid)sid=instance.config.sid;
	   instance.RD(instance.config.listUrl,{"sid":sid,"mid":mid,"pno":pno,"pco":pco},callback,"list_"+sid+"_"+mid+"_"+pno+"_"+pco);
   };
   this.Art=function(aid,callback)
   {
	   instance.RD(instance.config.artUrl,{"aid":aid},callback,"art_"+aid);
   };
   this.Cate=function(lid,tid,callback)
   {
	  if(!lid)lid=instance.config.lid;
	  if(!tid)tid=instance.config.tid;
	  instance.RD(instance.config.cateUrl,{"lid":lid,"tid":tid},callback,"cate_"+lid+"_"+tid);
  };
  this.More=function(cid,callback,pno,pco,sid)
  {
	  if(!pno) pno="";
	  if(!pco) pco="";
	  if(!sid)sid=instance.config.sid;
	  instance.RD(instance.config.moreUrl,{"sid":sid,"cid":cid,"pno":pno,"pco":pco},callback,"more_"+sid+"_"+cid+"_"+pno+"_"+pco);
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