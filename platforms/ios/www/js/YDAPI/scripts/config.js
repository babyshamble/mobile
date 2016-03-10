YX.Data.Config = function(module)
{
	var instance =this;
	this.serverPath = "";
	this.siteUrl="";
	this.mapUrl="";
	this.hotUrl="";
	this.listUrl="";
	this.artUrl="";
	this.cateUrl="";
	this.moreUrl="";
	this.sid="";//最新的网站编号
	this.lid="";//区域编号
	this,tid="";//行业编号
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
		instance.mapUrl = $("#yx_mapurl").length>0?$("#yx_mapurl").get(0).href:"";
		instance.hotUrl = $("#yx_hoturl").length>0?$("#yx_hoturl").get(0).href:"";
		instance.listUrl = $("#yx_listurl").length>0?$("#yx_listurl").get(0).href:"";
		instance.cateUrl = $("#yx_cateurl").length>0?$("#yx_cateurl").get(0).href:"";
		instance.moreUrl = $("#yx_moreurl").length>0?$("#yx_moreurl").get(0).href:"";
		instance.artUrl = $("#yx_arturl").length>0?$("#yx_arturl").get(0).href:"";
		instance.sid=$("#yx_sid").length>0?$("#yx_sid").text():"";
		instance.tid=$("#yx_tid").length>0?$("#yx_tid").text():"";
		instance.lid=$("#yx_lid").length>0?$("#yx_lid").text():"";
		
		
	};
};
