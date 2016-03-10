/*TMODJS:{"version":1,"md5":"a7d27057f3b4bfb1f9b01d973f2b4b22"}*/
template('components/comfort/mapping_3rd',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,maps=$data.maps,map=$data.map,index=$data.index,$escape=$utils.$escape,runtime=$data.runtime,cate=$data.cate,site=$data.site,$out='';$out+='<ul> ';
$each(maps,function(map,index){
$out+=' <li><a href="#/website/';
$out+=$escape(runtime.websiteMode);
$out+='/';
$out+=$escape(cate.cid);
$out+='/';
$out+=$escape(site.id);
$out+='/';
$out+=$escape(map.id);
$out+='">';
$out+=$escape(map.name);
$out+='</a></li> ';
});
$out+=' </ul> ';
return new String($out);
});