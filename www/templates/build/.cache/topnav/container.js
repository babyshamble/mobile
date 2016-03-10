/*TMODJS:{"version":1,"md5":"c49451c01605d02c6e28961347a6dddf"}*/
template('topnav/container',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,sitemap=$data.sitemap,map=$data.map,index=$data.index,$escape=$utils.$escape,cate=$data.cate,site=$data.site,$out='';$out+=' <ul> ';
$each(sitemap,function(map,index){
$out+=' <li data-mapid="';
$out+=$escape(map.id);
$out+='"> <a href="#/website/';
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