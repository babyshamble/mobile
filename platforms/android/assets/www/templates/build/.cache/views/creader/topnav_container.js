/*TMODJS:{"version":1,"md5":"ab648f8a706ef2097830c52f17677850"}*/
template('views/creader/topnav_container',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,sitemap=$data.sitemap,map=$data.map,index=$data.index,$escape=$utils.$escape,runtime=$data.runtime,cate=$data.cate,site=$data.site,$out='';$out+=' <ul> ';
$each(sitemap,function(map,index){
$out+=' <li data-mapid="';
$out+=$escape(map.id);
$out+='"> <a href="#/website/';
$out+=$escape(runtime.websiteMode);
$out+='/';
$out+=$escape(cate.cid);
$out+='/';
$out+=$escape(site.id);
$out+='/';
$out+=$escape(map.id);
$out+='">';
$out+=$escape(map.name);
$out+='</a> </li> ';
});
$out+=' </ul> ';
return new String($out);
});