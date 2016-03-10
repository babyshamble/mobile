/*TMODJS:{"version":1,"md5":"09491152fb6f7c4f5b64bfbf5cb27f8c"}*/
template('components/comfort/mapping_shown_items',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,$each=$utils.$each,maps=$data.maps,map=$data.map,index=$data.index,$escape=$utils.$escape,runtime=$data.runtime,cate=$data.cate,site=$data.site,$out='';$out+='<i class="website-mapping-toggler icons-website icons-website-mapping_toggler" title="定制我需要的内容"></i> ';
if(i = 0){
}
$out+=' <ul> ';
$each(maps,function(map,index){
$out+=' ';
if(++i <= 8){
$out+=' <li class="" data-mapid="';
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
}
$out+=' ';
});
$out+=' </ul> ';
return new String($out);
});